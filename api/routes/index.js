"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _middleware = _interopRequireDefault(require("../middleware"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var route = (0, _express.Router)();
var _default = exports["default"] = function _default(app) {
  app.use("/brevo", route);
  route.post("/send", _bodyParser["default"].raw({
    type: "application/json"
  }), _middleware["default"].wrap(require("./send-email")["default"]));

  // New route to debug getAbandonedCarts method
  route.get("/abandone-cart", _middleware["default"].wrap(require("./abandone-cart")["default"]));
  return app;
};