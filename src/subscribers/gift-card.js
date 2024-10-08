class GiftCardSubscriber {
    constructor({ eventBusService, brevoService }) {
        this.brevoService_ = brevoService
        this.eventBus_ = eventBusService

        this.eventBus_.subscribe("gift_card.created", async (data) => {
            await this.brevoService_.sendNotification(
                "gift_card.created",
                data,
                null
            )
        })
    }
}

export default GiftCardSubscriber
