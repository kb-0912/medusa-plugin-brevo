import { Validator, MedusaError } from "medusa-core-utils";

export default async (req, res) => {
  const schema = Validator.object().keys({
    TemplateId: Validator.number().required(),  // TemplateId should be a number as per Brevo's requirements
    From: Validator.string().email().required(),  // Validate From as a valid email
    To: Validator.array().items(Validator.string().email()).required(),  // Ensure 'To' is an array of valid email strings
    TemplateModel: Validator.object().optional().default({}),
  });

  const { value, error } = schema.validate(req.body);
  if (error) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.details);
  }

  try {
    const brevoService = req.scope.resolve("brevoService");

    await brevoService.sendEmail({
      From: value.From,
      to: value.To.map(email => ({ email })),  // Ensure each email is wrapped in an object
      TemplateId: value.TemplateId,
      TemplateModel: value.TemplateModel,
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send email");
  }
};
