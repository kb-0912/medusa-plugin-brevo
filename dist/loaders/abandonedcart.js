"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_1 = require("@medusajs/medusa");
const brevo_1 = __importDefault(require("../services/brevo"));
const abandonedcart = async (container, options) => {
    const jobSchedulerService = container.resolve("jobSchedulerService");
    jobSchedulerService.create("abandoned-carts", {}, "0 * * * *", async () => {
        const brevoService = container.resolve("brevoService");
        await brevoService.getAbandonedCarts();
    });
};
exports.default = abandonedcart;
