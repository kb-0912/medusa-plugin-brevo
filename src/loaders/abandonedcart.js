import { Cart } from "@medusajs/medusa";
import BrevoService from "../services/brevo";

const abandonedcart = async (
    container,
    options
) => {
  const jobSchedulerService = container.resolve("jobSchedulerService");
  jobSchedulerService.create("abandoned-carts", {}, "0 * * * *", async () => {

    const brevoService = container.resolve(
        "brevoService"
    );
    await brevoService.getAbandonedCarts();
  });
};

export default abandonedcart;
