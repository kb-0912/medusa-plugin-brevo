class UserSubscriber {
   constructor({ eventBusService, brevoService }) {
     this.brevoService_ = brevoService
     this.eventBus_ = eventBusService

       this.eventBus_.subscribe("user.password_reset", async (data) => {
           await this.brevoService_.sendNotification(
               "user.password_reset",
               data,
               null
           )
       })
       this.eventBus_.subscribe("user.created", async (data) => {
           await this.brevoService_.sendNotification(
               "user.created",
               data,
               null
           )
       })

       this.eventBus_.subscribe("auth.password_reset", async (data) => {
           await this.brevoService_.sendNotification(
               "auth.password_reset",
               data,
               null
           )
       })
       this.eventBus_.subscribe("auth.verify_account", async (data) => {
           await this.brevoService_.sendNotification(
               "auth.verify_account",
               data,
               null
           )
       })

       this.eventBus_.subscribe("activity.inactive_user", async (data) => {
           await this.brevoService_.sendNotification(
               "activity.inactive_user",
               data,
               null
           )
       })
       this.eventBus_.subscribe("activity.inactive_customer", async (data) => {
           await this.brevoService_.sendNotification(
               "activity.inactive_customer",
               data,
               null
           )
       })
   }
 }

 export default UserSubscriber
