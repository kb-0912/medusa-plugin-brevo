"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfGenerator_1 = __importDefault(require("../generators/pdfGenerator"));
class OrderSubscriber {
    /**
     * @param {NotificationService} notificationService - Notification service
     */
    constructor({ notificationService }) {
        this.notificationService_ = notificationService;
        this.notificationService_.registerAttachmentGenerator(new pdfGenerator_1.default());
        this.notificationService_.subscribe("cart.updated", "brevo");
        this.notificationService_.subscribe("order.placed", "brevo");
        this.notificationService_.subscribe("order.canceled", "brevo");
        this.notificationService_.subscribe("order.shipment_created", "brevo");
        this.notificationService_.subscribe("customer.created", "brevo");
        this.notificationService_.subscribe("customer.password_reset", "brevo");
    }
}
exports.default = OrderSubscriber;
