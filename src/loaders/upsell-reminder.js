import BrevoService from "../services/brevo";
import { Cart } from "@medusajs/medusa";
const upsellReminder = async (
    container,
    options
) => {
    const jobSchedulerService = container.resolve("jobSchedulerService");
    jobSchedulerService.create("upsell-reminder", {}, "* * * * *", async () => {
        // job to execute
        const brevoService = container.resolve(
            "brevoService"
        );
        console.log(
            "Running upsell reminder job"
        )
        const orders = await brevoService.remindUpsellOrders();
    });
};

export default upsellReminder;
