"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const middleware_1 = __importDefault(require("../middleware"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/brevo", route);
    route.post("/send", body_parser_1.default.raw({ type: "application/json" }), middleware_1.default.wrap(require("./send-email").default));
    // New route to debug getAbandonedCarts method
    route.get("/abandone-cart", middleware_1.default.wrap(require("./abandone-cart").default));
    return app;
};
