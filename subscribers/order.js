"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pdfGenerator = _interopRequireDefault(require("../generators/pdfGenerator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
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