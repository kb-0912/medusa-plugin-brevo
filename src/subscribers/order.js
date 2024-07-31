import PdfGenerator from "../generators/pdfGenerator";

class OrderSubscriber {

    /**
     * @param {NotificationService} notificationService - Notification service
     */
   constructor({ notificationService }) {
     this.notificationService_ = notificationService
     this.notificationService_.registerAttachmentGenerator(new PdfGenerator())

     this.notificationService_.subscribe("cart.updated", "brevo")
     this.notificationService_.subscribe("order.placed", "brevo")
     this.notificationService_.subscribe("order.canceled", "brevo")
     this.notificationService_.subscribe("order.shipment_created", "brevo")
     this.notificationService_.subscribe("customer.created", "brevo")
     this.notificationService_.subscribe("customer.password_reset", "brevo")
   }
 }

 export default OrderSubscriber
