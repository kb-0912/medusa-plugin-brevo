import { Validator, MedusaError } from "medusa-core-utils";

export default async (req, res) => {
  try {
    const brevoService = req.scope.resolve("brevoService");

    // Call the getAbandonedCarts method for debugging purposes
    await brevoService.getAbandonedCarts();

    res.sendStatus(200); // Respond with 200 status if everything goes well
  } catch (err) {
    console.error("Error running getAbandonedCarts:", err);
    res.status(500).send("Failed to run getAbandonedCarts");
  }
};
