export default OrderSubscriber;
declare class OrderSubscriber {
    /**
     * @param {NotificationService} notificationService - Notification service
     */
    constructor({ notificationService }: NotificationService);
    notificationService_: NotificationService;
}
