class CustomerSubscriber {
    constructor({ eventBusService, brevoService }) {
      this.brevoService_ = brevoService;
      this.eventBus_ = eventBusService;
  
      this.eventBus_.subscribe("customer.created", async (data) => {
        await this.brevoService_.addCustomerToContactList(data);
      });
    }
  }
  
  export default CustomerSubscriber;
  