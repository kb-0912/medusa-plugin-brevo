export default CustomerSubscriber;
declare class CustomerSubscriber {
    constructor({ eventBusService, brevoService }: {
        eventBusService: any;
        brevoService: any;
    });
    brevoService_: any;
    eventBus_: any;
}
