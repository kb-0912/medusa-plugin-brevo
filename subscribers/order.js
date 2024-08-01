"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pdfGenerator = _interopRequireDefault(require("../generators/pdfGenerator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _instanceof(n, e) { return null != e && "undefined" != typeof Symbol && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](n) : n instanceof e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!_instanceof(a, n)) throw new TypeError("Cannot call a class as a function"); }
var OrderSubscriber = /*#__PURE__*/_createClass(
/**
 * @param {NotificationService} notificationService - Notification service
 */
function OrderSubscriber(_ref) {
  var notificationService = _ref.notificationService;
  _classCallCheck(this, OrderSubscriber);
  this.notificationService_ = notificationService;
  this.notificationService_.registerAttachmentGenerator(new _pdfGenerator["default"]());
  this.notificationService_.subscribe("cart.updated", "brevo");
  this.notificationService_.subscribe("order.placed", "brevo");
  this.notificationService_.subscribe("order.canceled", "brevo");
  this.notificationService_.subscribe("order.shipment_created", "brevo");
  this.notificationService_.subscribe("customer.created", "brevo");
  this.notificationService_.subscribe("customer.password_reset", "brevo");
});
var _default = exports["default"] = OrderSubscriber;