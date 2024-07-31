import { Validator, MedusaError } from "medusa-core-utils";

export default async (req, res) => {
  const schema = Validator.object().keys({
    TemplateId: Validator.number().required(),  // TemplateId should be a number as per Brevo's requirements
    From: Validator.string().required(),
    To: Validator.string().required(),
    TemplateModel: Validator.object().optional().default({}),
  });

  const { value, error } = schema.validate(req.body);
  if (error) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.details);
  }

  try {
    // Resolve the brevoService instead of postmarkService
    const brevoService = req.scope.resolve("brevoService");

    // Pass the parameters according to the brevoService's sendEmail method
    await brevoService.sendEmail({
      From: value.From,
      to: value.To,
      TemplateId: value.TemplateId,
      TemplateModel: value.TemplateModel,
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send email");
  }
};
