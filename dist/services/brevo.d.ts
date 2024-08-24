export default BrevoService;
declare class BrevoService {
    static identifier: string;
    /**
     * @param {Object} options - options defined in `medusa-config.js`
     */
    constructor({ manager, orderRepository, cartRepository, lineItemRepository, orderService, cartService, fulfillmentService, totalsService, giftCardService, }: any, options: any);
    manager_: any;
    orderRepository_: any;
    cartRepository_: any;
    lineItemRepository_: any;
    options_: any;
    orderService_: any;
    cartService_: any;
    fulfillmentService_: any;
    totalsService_: any;
    giftCardService_: any;
    client_: Brevo.TransactionalEmailsApi;
    contactsClient_: Brevo.ContactsApi;
    addCustomerToContactList(customer: any): Promise<{
        response: import("http").IncomingMessage;
        body: Brevo.CreateUpdateContactModel;
    }>;
    sendEmail(sendOptions: any): Promise<{
        response: import("http").IncomingMessage;
        body: Brevo.CreateSmtpEmail;
    }>;
    getAbandonedCarts(): Promise<void>;
    remindUpsellOrders(): Promise<any[]>;
    fetchAttachments(event: any, data: any, attachmentGenerator: any): Promise<any[]>;
    fetchData(event: any, eventData: any, attachmentGenerator: any): Promise<any>;
    sendNotification(event: any, eventData: any, attachmentGenerator: any): Promise<false | {
        to: {
            email: any;
        }[];
        status: string;
        data: {
            sender: {
                email: any;
                name: any;
            };
            to: {
                email: any;
            }[];
            templateId: any;
            params: any;
        };
    }>;
    resendNotification(notification: any, config: any, attachmentGenerator: any): Promise<{
        to: any;
        status: string;
        data: any;
    } | {
        to: any;
        status: string;
        data: any;
    }>;
    sendMail(options: any): Promise<void>;
    orderShipmentCreatedData({ id, fulfillment_id }: {
        id: any;
        fulfillment_id: any;
    }, attachmentGenerator: any): Promise<{
        locale: any;
        order: any;
        date: any;
        email: any;
        fulfillment: any;
        tracking_links: any;
        tracking_number: any;
    }>;
    orderCanceledData({ id }: {
        id: any;
    }): Promise<any>;
    giftCardData({ id }: {
        id: any;
    }): Promise<any>;
    orderPlacedData({ id }: {
        id: any;
    }): Promise<any>;
    userPasswordResetData(data: any): any;
    customerPasswordResetData(data: any): any;
    processItems_(items: any, taxRate: any, currencyCode: any): any;
    humanPrice_(amount: any, currency: any): string;
    normalizeThumbUrl_(url: any): any;
    extractLocale(fromOrder: any): Promise<any>;
}
import * as Brevo from "@getbrevo/brevo";
