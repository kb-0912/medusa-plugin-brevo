export default GiftCardSubscriber;
declare class GiftCardSubscriber {
    constructor({ eventBusService, brevoService }: {
        eventBusService: any;
        brevoService: any;
    });
    brevoService_: any;
    eventBus_: any;
}
