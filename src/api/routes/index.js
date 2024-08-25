import { Router } from "express"
import bodyParser from "body-parser"
import middlewares from "../middleware"

const route = Router()

export default (app) => {
  app.use("/brevo", route)

  route.post(
    "/send",
    bodyParser.raw({ type: "application/json" }),
    middlewares.wrap(require("./send-email").default)
  )

   // New route to debug getAbandonedCarts method
   route.get(
    "/abandone-cart",
    middlewares.wrap(require("./abandone-cart").default)
  )
  return app

}
