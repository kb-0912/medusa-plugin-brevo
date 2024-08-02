import { Validator, MedusaError } from "medusa-core-utils";

export default async (req, res) => {
  const schema = Validator.object().keys({
    TemplateId: Validator.number().required(),
    From: Validator.string().email().required(),
    FromName: Validator.string().required(),     
    To: Validator.array().items(Validator.string().email()).required(),
    TemplateModel: Validator.object().optional().default({}),
  });

  const { value, error } = schema.validate(req.body);
  if (error) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.details);
  }

  try {
    const brevoService = req.scope.resolve("brevoService");

    await brevoService.sendEmail({
      from_email: value.From,       
      from_name: value.FromName,    
      to: value.To.map(email => ({ email })),
      TemplateId: value.TemplateId,
      TemplateModel: value.TemplateModel,
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send email");
  }
};
