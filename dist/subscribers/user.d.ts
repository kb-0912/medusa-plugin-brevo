export default UserSubscriber;
declare class UserSubscriber {
    constructor({ eventBusService, brevoService }: {
        eventBusService: any;
        brevoService: any;
    });
    brevoService_: any;
    eventBus_: any;
}
