"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_core_utils_1 = require("medusa-core-utils");
exports.default = async (req, res) => {
    const schema = medusa_core_utils_1.Validator.object().keys({
        TemplateId: medusa_core_utils_1.Validator.number().required(), // TemplateId should be a number as per Brevo's requirements
        From: medusa_core_utils_1.Validator.string().required(),
        To: medusa_core_utils_1.Validator.array().items(medusa_core_utils_1.Validator.string().email()).required(), // Ensure 'To' is an array of valid email strings
        TemplateModel: medusa_core_utils_1.Validator.object().optional().default({}),
    });
    const { value, error } = schema.validate(req.body);
    if (error) {
        throw new medusa_core_utils_1.MedusaError(medusa_core_utils_1.MedusaError.Types.INVALID_DATA, error.details);
    }
    try {
        const brevoService = req.scope.resolve("brevoService");
        await brevoService.sendEmail({
            // From: value.From,
            to: value.To.map(email => ({ email })), // Ensure each email is wrapped in an object
            TemplateId: value.TemplateId,
            TemplateModel: value.TemplateModel,
        });
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Failed to send email");
    }
};
