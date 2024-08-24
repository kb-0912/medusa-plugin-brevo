"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brevo_1 = __importDefault(require("../services/brevo"));
const medusa_1 = require("@medusajs/medusa");
const upsellReminder = async (container, options) => {
    const jobSchedulerService = container.resolve("jobSchedulerService");
    jobSchedulerService.create("upsell-reminder", {}, "* * * * *", async () => {
        // job to execute
        const brevoService = container.resolve("brevoService");
        console.log("Running upsell reminder job");
        const orders = await brevoService.remindUpsellOrders();
    });
};
exports.default = upsellReminder;
