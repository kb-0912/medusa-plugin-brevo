"use strict";

function _instanceof(n, e) { return null != e && "undefined" != typeof Symbol && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](n) : n instanceof e; }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _medusaCoreUtils = require("medusa-core-utils");
var _luxon = require("luxon");
var _medusaInterfaces = require("medusa-interfaces");
var _typeorm = require("typeorm");
var Brevo = _interopRequireWildcard(require("@getbrevo/brevo"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && _instanceof(e.prototype, Generator) ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!_instanceof(a, n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Import Brevo SDK
var BrevoService = /*#__PURE__*/function (_NotificationService) {
  /**
   * @param {Object} options - options defined in `medusa-config.js`
   */
  function BrevoService(_ref, options) {
    var _this;
    var manager = _ref.manager,
      orderRepository = _ref.orderRepository,
      cartRepository = _ref.cartRepository,
      lineItemRepository = _ref.lineItemRepository,
      orderService = _ref.orderService,
      cartService = _ref.cartService,
      fulfillmentService = _ref.fulfillmentService,
      totalsService = _ref.totalsService,
      giftCardService = _ref.giftCardService;
    _classCallCheck(this, BrevoService);
    _this = _callSuper(this, BrevoService, [{
      manager: manager,
      orderRepository: orderRepository,
      cartRepository: cartRepository,
      lineItemRepository: lineItemRepository
    }]);
    _defineProperty(_this, "manager_", null);
    _defineProperty(_this, "orderRepository_", null);
    _defineProperty(_this, "cartRepository_", null);
    _defineProperty(_this, "lineItemRepository_", null);
    _this.options_ = options;
    _this.manager_ = manager;
    _this.orderRepository_ = orderRepository;
    _this.cartRepository_ = cartRepository;
    _this.lineItemRepository_ = lineItemRepository;
    _this.orderService_ = orderService;
    _this.cartService_ = cartService;
    _this.fulfillmentService_ = fulfillmentService;
    _this.totalsService_ = totalsService;
    _this.giftCardService_ = giftCardService;

    // Initialize Brevo client
    _this.client_ = new Brevo.TransactionalEmailsApi();
    _this.client_.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, options.api_key);
    _this.contactsClient_ = new Brevo.ContactsApi();
    _this.contactsClient_.setApiKey(Brevo.ContactsApiApiKeys.apiKey, options.api_key);
    return _this;
  }
  _inherits(BrevoService, _NotificationService);
  return _createClass(BrevoService, [{
    key: "addCustomerToContactList",
    value: function () {
      var _addCustomerToContactList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(customer) {
        var _this$options_, _this$options_2, _this$options_3;
        var contactData, response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!((_this$options_ = this.options_) !== null && _this$options_ !== void 0 && _this$options_.contact_list) || !((_this$options_2 = this.options_) !== null && _this$options_2 !== void 0 && (_this$options_2 = _this$options_2.contact_list) !== null && _this$options_2 !== void 0 && _this$options_2.enabled) || !((_this$options_3 = this.options_) !== null && _this$options_3 !== void 0 && (_this$options_3 = _this$options_3.contact_list) !== null && _this$options_3 !== void 0 && _this$options_3.contact_list_id))) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              contactData = {
                email: customer.email,
                attributes: {
                  FNAME: customer.first_name,
                  LNAME: customer.last_name
                },
                listIds: [this.options_.contact_list.contact_list_id] // Ensure this is an array
              };
              _context.prev = 3;
              _context.next = 6;
              return this.contactsClient_.createContact(contactData);
            case 6:
              response = _context.sent;
              return _context.abrupt("return", response);
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.error("Error adding customer to Brevo contact list:", _context.t0);
              throw _context.t0;
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3, 10]]);
      }));
      function addCustomerToContactList(_x) {
        return _addCustomerToContactList.apply(this, arguments);
      }
      return addCustomerToContactList;
    }()
  }, {
    key: "sendEmail",
    value: function () {
      var _sendEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sendOptions) {
        var emailData, response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              emailData = {
                sender: {
                  email: sendOptions.from_email,
                  name: this.options_.from_name // Assuming this is set in your options
                },
                to: sendOptions.to,
                templateId: sendOptions.TemplateId,
                params: sendOptions.TemplateModel
              };
              _context2.prev = 1;
              _context2.next = 4;
              return this.client_.sendTransacEmail(emailData);
            case 4:
              response = _context2.sent;
              return _context2.abrupt("return", response);
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              console.error("Error sending email with Brevo:", _context2.t0);
              throw _context2.t0;
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 8]]);
      }));
      function sendEmail(_x2) {
        return _sendEmail.apply(this, arguments);
      }
      return sendEmail;
    }()
  }, {
    key: "getAbandonedCarts",
    value: function () {
      var _getAbandonedCarts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var _this$options_4,
          _this$options_5,
          _this$options_6,
          _this$options_7,
          _options$first,
          _options$second,
          _options$third,
          _this2 = this;
        var options, now, firstCheck, secondCheck, thirdCheck, cartRepository, lineItemRepository, carts, abandonedCarts, _iterator, _step, _cart$metadata4, cart, orderCheck, cartData, _loop, _i, _abandonedCarts;
        return _regeneratorRuntime().wrap(function _callee6$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (!(!((_this$options_4 = this.options_) !== null && _this$options_4 !== void 0 && _this$options_4.abandoned_cart) || !((_this$options_5 = this.options_) !== null && _this$options_5 !== void 0 && (_this$options_5 = _this$options_5.abandoned_cart) !== null && _this$options_5 !== void 0 && _this$options_5.enabled) || !((_this$options_6 = this.options_) !== null && _this$options_6 !== void 0 && (_this$options_6 = _this$options_6.abandoned_cart) !== null && _this$options_6 !== void 0 && _this$options_6.first))) {
                _context7.next = 2;
                break;
              }
              return _context7.abrupt("return");
            case 2:
              console.log("Getting abandoned carts");
              options = (_this$options_7 = this.options_) === null || _this$options_7 === void 0 ? void 0 : _this$options_7.abandoned_cart;
              now = new Date();
              firstCheck = new Date(now.getTime() - parseInt(options === null || options === void 0 || (_options$first = options.first) === null || _options$first === void 0 ? void 0 : _options$first.delay) * 60 * 60 * 1000);
              secondCheck = new Date(now.getTime() - parseInt(options === null || options === void 0 || (_options$second = options.second) === null || _options$second === void 0 ? void 0 : _options$second.delay) * 60 * 60 * 1000);
              thirdCheck = new Date(now.getTime() - parseInt(options === null || options === void 0 || (_options$third = options.third) === null || _options$third === void 0 ? void 0 : _options$third.delay) * 60 * 60 * 1000);
              cartRepository = this.manager_.withRepository(this.cartRepository_);
              lineItemRepository = this.manager_.withRepository(this.lineItemRepository_);
              _context7.next = 12;
              return cartRepository.findBy({
                email: (0, _typeorm.Not)((0, _typeorm.IsNull)())
              });
            case 12:
              carts = _context7.sent;
              console.log("Checking carts");
              abandonedCarts = [];
              _iterator = _createForOfIteratorHelper(carts);
              _context7.prev = 16;
              _iterator.s();
            case 18:
              if ((_step = _iterator.n()).done) {
                _context7.next = 38;
                break;
              }
              cart = _step.value;
              orderCheck = false;
              _context7.prev = 21;
              _context7.next = 24;
              return this.orderService_.retrieveByCartId(cart.id);
            case 24:
              orderCheck = _context7.sent;
              _context7.next = 30;
              break;
            case 27:
              _context7.prev = 27;
              _context7.t0 = _context7["catch"](21);
              orderCheck = false;
            case 30:
              _context7.next = 32;
              return this.cartService_.retrieve(cart.id, {
                relations: ["items", "shipping_address", "region"]
              });
            case 32:
              cartData = _context7.sent;
              if (!orderCheck) {
                _context7.next = 35;
                break;
              }
              return _context7.abrupt("continue", 36);
            case 35:
              if (cartData.items.find(function (li) {
                return (li === null || li === void 0 ? void 0 : li.updated_at) <= firstCheck;
              }) !== undefined && (cart === null || cart === void 0 || (_cart$metadata4 = cart.metadata) === null || _cart$metadata4 === void 0 ? void 0 : _cart$metadata4.third_abandonedcart_mail) !== true) {
                abandonedCarts.push(cartData);
              }
            case 36:
              _context7.next = 18;
              break;
            case 38:
              _context7.next = 43;
              break;
            case 40:
              _context7.prev = 40;
              _context7.t1 = _context7["catch"](16);
              _iterator.e(_context7.t1);
            case 43:
              _context7.prev = 43;
              _iterator.f();
              return _context7.finish(43);
            case 46:
              if (!(abandonedCarts.length === 0)) {
                _context7.next = 48;
                break;
              }
              return _context7.abrupt("return");
            case 48:
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var _cart$region, _cart$region2, _cart$region3;
                var cart, check, items, sendOptions, _options$third2, _cart$metadata, _options$third3, _options$second2, _cart$metadata2, _options$second3, _options$first2, _cart$metadata3, _options$first3;
                return _regeneratorRuntime().wrap(function _loop$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      cart = _abandonedCarts[_i];
                      check = cart.items.sort(function (a, b) {
                        return b.updated_at.getTime() - a.updated_at.getTime();
                      })[0].updated_at;
                      items = _this2.processItems_(cart.items, cart !== null && cart !== void 0 && (_cart$region = cart.region) !== null && _cart$region !== void 0 && _cart$region.includes_tax ? 0 : (cart === null || cart === void 0 || (_cart$region2 = cart.region) === null || _cart$region2 === void 0 ? void 0 : _cart$region2.tax_rate) / 100, cart === null || cart === void 0 || (_cart$region3 = cart.region) === null || _cart$region3 === void 0 ? void 0 : _cart$region3.currency_code.toUpperCase());
                      sendOptions = {
                        sender: {
                          email: _this2.options_.from_email,
                          name: _this2.options_.from_name
                        },
                        // Wrap 'From' in a 'sender' object with 'email'
                        to: [{
                          email: cart.email
                        }],
                        // 'to' should be an array of objects with 'email'
                        templateId: 0,
                        // Assuming '0' is a placeholder for the actual template ID
                        params: _objectSpread(_objectSpread({}, cart), {}, {
                          items: items
                        }, _this2.options_.default_data)
                      };
                      if (!(check < secondCheck)) {
                        _context6.next = 18;
                        break;
                      }
                      if (!(check < thirdCheck)) {
                        _context6.next = 12;
                        break;
                      }
                      if (!(options !== null && options !== void 0 && (_options$third2 = options.third) !== null && _options$third2 !== void 0 && _options$third2.template && (cart === null || cart === void 0 || (_cart$metadata = cart.metadata) === null || _cart$metadata === void 0 ? void 0 : _cart$metadata.third_abandonedcart_mail) !== true)) {
                        _context6.next = 10;
                        break;
                      }
                      sendOptions.TemplateId = options === null || options === void 0 || (_options$third3 = options.third) === null || _options$third3 === void 0 ? void 0 : _options$third3.template;
                      _context6.next = 10;
                      return _this2.sendEmail(sendOptions).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                          while (1) switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.next = 2;
                              return cartRepository.update(cart.id, {
                                metadata: _objectSpread(_objectSpread({}, cart.metadata || {}), {}, {
                                  third_abandonedcart_mail: true
                                })
                              });
                            case 2:
                            case "end":
                              return _context3.stop();
                          }
                        }, _callee3);
                      })))["catch"](function (error) {
                        console.error(error);
                        return {
                          to: sendOptions.to,
                          status: 'failed',
                          data: sendOptions
                        };
                      });
                    case 10:
                      _context6.next = 16;
                      break;
                    case 12:
                      if (!(options !== null && options !== void 0 && (_options$second2 = options.second) !== null && _options$second2 !== void 0 && _options$second2.template && (cart === null || cart === void 0 || (_cart$metadata2 = cart.metadata) === null || _cart$metadata2 === void 0 ? void 0 : _cart$metadata2.second_abandonedcart_mail) !== true)) {
                        _context6.next = 16;
                        break;
                      }
                      sendOptions.TemplateId = options === null || options === void 0 || (_options$second3 = options.second) === null || _options$second3 === void 0 ? void 0 : _options$second3.template;
                      _context6.next = 16;
                      return _this2.sendEmail(sendOptions).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                          while (1) switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.next = 2;
                              return cartRepository.update(cart.id, {
                                metadata: _objectSpread(_objectSpread({}, cart.metadata || {}), {}, {
                                  second_abandonedcart_mail: true
                                })
                              });
                            case 2:
                            case "end":
                              return _context4.stop();
                          }
                        }, _callee4);
                      })))["catch"](function (error) {
                        console.error(error);
                        return {
                          to: sendOptions.to,
                          status: 'failed',
                          data: sendOptions
                        };
                      });
                    case 16:
                      _context6.next = 22;
                      break;
                    case 18:
                      if (!(options !== null && options !== void 0 && (_options$first2 = options.first) !== null && _options$first2 !== void 0 && _options$first2.template && (cart === null || cart === void 0 || (_cart$metadata3 = cart.metadata) === null || _cart$metadata3 === void 0 ? void 0 : _cart$metadata3.first_abandonedcart_mail) !== true)) {
                        _context6.next = 22;
                        break;
                      }
                      sendOptions.TemplateId = options === null || options === void 0 || (_options$first3 = options.first) === null || _options$first3 === void 0 ? void 0 : _options$first3.template;
                      _context6.next = 22;
                      return _this2.sendEmail(sendOptions).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
                        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                          while (1) switch (_context5.prev = _context5.next) {
                            case 0:
                              _context5.next = 2;
                              return cartRepository.update(cart.id, {
                                metadata: _objectSpread(_objectSpread({}, cart.metadata || {}), {}, {
                                  first_abandonedcart_mail: true
                                })
                              });
                            case 2:
                            case "end":
                              return _context5.stop();
                          }
                        }, _callee5);
                      })))["catch"](function (error) {
                        console.error(error);
                        return {
                          to: sendOptions.to,
                          status: 'failed',
                          data: sendOptions
                        };
                      });
                    case 22:
                    case "end":
                      return _context6.stop();
                  }
                }, _loop);
              });
              _i = 0, _abandonedCarts = abandonedCarts;
            case 50:
              if (!(_i < _abandonedCarts.length)) {
                _context7.next = 55;
                break;
              }
              return _context7.delegateYield(_loop(), "t2", 52);
            case 52:
              _i++;
              _context7.next = 50;
              break;
            case 55:
            case "end":
              return _context7.stop();
          }
        }, _callee6, this, [[16, 40, 43, 46], [21, 27]]);
      }));
      function getAbandonedCarts() {
        return _getAbandonedCarts.apply(this, arguments);
      }
      return getAbandonedCarts;
    }()
  }, {
    key: "remindUpsellOrders",
    value: function () {
      var _remindUpsellOrders = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var _this$options_8,
          _this$options_9,
          _this$options_10,
          _this$options_11,
          _this$options_12,
          _this3 = this;
        var orderRepo, options, validThrough, orders, _iterator2, _step2, _loop2;
        return _regeneratorRuntime().wrap(function _callee8$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              if (!(!((_this$options_8 = this.options_) !== null && _this$options_8 !== void 0 && _this$options_8.upsell) || !((_this$options_9 = this.options_) !== null && _this$options_9 !== void 0 && (_this$options_9 = _this$options_9.upsell) !== null && _this$options_9 !== void 0 && _this$options_9.enabled) || !((_this$options_10 = this.options_) !== null && _this$options_10 !== void 0 && (_this$options_10 = _this$options_10.upsell) !== null && _this$options_10 !== void 0 && _this$options_10.collection) || !((_this$options_11 = this.options_) !== null && _this$options_11 !== void 0 && (_this$options_11 = _this$options_11.upsell) !== null && _this$options_11 !== void 0 && _this$options_11.delay) || !((_this$options_12 = this.options_) !== null && _this$options_12 !== void 0 && (_this$options_12 = _this$options_12.upsell) !== null && _this$options_12 !== void 0 && _this$options_12.template))) {
                _context10.next = 2;
                break;
              }
              return _context10.abrupt("return", []);
            case 2:
              orderRepo = this.manager_.withRepository(this.orderRepository_);
              options = this.options_.upsell;
              validThrough = _luxon.DateTime.now().minus({
                days: options.valid
              }).toLocaleString(_luxon.DateTime.DATE_FULL);
              _context10.next = 7;
              return orderRepo.findBy({
                created_at: (0, _typeorm.LessThan)(new Date(new Date().getTime() - parseInt(options.delay) * 60 * 60 * 24 * 1000))
              });
            case 7:
              orders = _context10.sent;
              _iterator2 = _createForOfIteratorHelper(orders);
              _context10.prev = 9;
              _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
                var _order$metadata;
                var order, orderData, upsell, _iterator3, _step3, _item$variant, item, sendOptions;
                return _regeneratorRuntime().wrap(function _loop2$(_context9) {
                  while (1) switch (_context9.prev = _context9.next) {
                    case 0:
                      order = _step2.value;
                      if (!((_order$metadata = order.metadata) !== null && _order$metadata !== void 0 && _order$metadata.upsell_sent || order.created_at < new Date(new Date().getTime() - parseInt(options.delay) * 60 * 60 * 24 * 1000))) {
                        _context9.next = 3;
                        break;
                      }
                      return _context9.abrupt("return", 1);
                    case 3:
                      _context9.next = 5;
                      return _this3.orderService_.retrieve(order.id, {
                        select: ["id"],
                        relations: ["customer", "items", "items.variant", "items.variant.product"]
                      });
                    case 5:
                      orderData = _context9.sent;
                      upsell = true;
                      _iterator3 = _createForOfIteratorHelper(orderData.items);
                      try {
                        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                          item = _step3.value;
                          if ((item === null || item === void 0 || (_item$variant = item.variant) === null || _item$variant === void 0 || (_item$variant = _item$variant.product) === null || _item$variant === void 0 ? void 0 : _item$variant.collection_id) !== options.collection) upsell = false;
                        }
                      } catch (err) {
                        _iterator3.e(err);
                      } finally {
                        _iterator3.f();
                      }
                      if (!upsell) {
                        _context9.next = 15;
                        break;
                      }
                      if (options.template.includes(",")) {
                        options.template = options.template.split(",");
                        options.template = options.template[Math.floor(Math.random() * options.template.length)];
                      }
                      sendOptions = {
                        sender: {
                          email: _this3.options_.from_email,
                          name: _this3.options_.from_name
                        },
                        // Corrected: Wrap 'From' in 'sender' object
                        to: [{
                          email: orderData.customer.email
                        }],
                        // Corrected: 'to' should be an array of objects
                        templateId: options.template,
                        // Ensure this is the correct template ID
                        params: _objectSpread(_objectSpread(_objectSpread({}, orderData), _this3.options_.default_data), {}, {
                          valid_through: validThrough
                        })
                      }; // Update order metadata
                      order.metadata = _objectSpread(_objectSpread({}, order.metadata), {}, {
                        upsell_sent: true
                      });
                      _context9.next = 15;
                      return _this3.sendEmail(sendOptions).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                        return _regeneratorRuntime().wrap(function _callee7$(_context8) {
                          while (1) switch (_context8.prev = _context8.next) {
                            case 0:
                              _context8.next = 2;
                              return _this3.orderService_.update(order.id, {
                                metadata: order.metadata
                              });
                            case 2:
                            case "end":
                              return _context8.stop();
                          }
                        }, _callee7);
                      })))["catch"](function (error) {
                        console.error(error);
                        return {
                          to: sendOptions.to,
                          status: 'failed',
                          data: sendOptions
                        };
                      });
                    case 15:
                    case "end":
                      return _context9.stop();
                  }
                }, _loop2);
              });
              _iterator2.s();
            case 12:
              if ((_step2 = _iterator2.n()).done) {
                _context10.next = 18;
                break;
              }
              return _context10.delegateYield(_loop2(), "t0", 14);
            case 14:
              if (!_context10.t0) {
                _context10.next = 16;
                break;
              }
              return _context10.abrupt("continue", 16);
            case 16:
              _context10.next = 12;
              break;
            case 18:
              _context10.next = 23;
              break;
            case 20:
              _context10.prev = 20;
              _context10.t1 = _context10["catch"](9);
              _iterator2.e(_context10.t1);
            case 23:
              _context10.prev = 23;
              _iterator2.f();
              return _context10.finish(23);
            case 26:
            case "end":
              return _context10.stop();
          }
        }, _callee8, this, [[9, 20, 23, 26]]);
      }));
      function remindUpsellOrders() {
        return _remindUpsellOrders.apply(this, arguments);
      }
      return remindUpsellOrders;
    }()
  }, {
    key: "fetchAttachments",
    value: function () {
      var _fetchAttachments = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(event, data, attachmentGenerator) {
        var attachments, base64, _data$return_request, shipping_method, shipping_data, provider, lbl, _base, _this$options_$pdf$en, _this$options_13, _base2;
        return _regeneratorRuntime().wrap(function _callee9$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              attachments = [];
              _context11.t0 = event;
              _context11.next = _context11.t0 === "user.password_reset" ? 4 : _context11.t0 === "swap.created" ? 16 : _context11.t0 === "order.return_requested" ? 16 : _context11.t0 === "order.placed" ? 41 : 54;
              break;
            case 4:
              _context11.prev = 4;
              if (!(attachmentGenerator && attachmentGenerator.createPasswordReset)) {
                _context11.next = 10;
                break;
              }
              _context11.next = 8;
              return attachmentGenerator.createPasswordReset();
            case 8:
              base64 = _context11.sent;
              attachments.push({
                name: "password-reset.pdf",
                base64: base64,
                type: "application/pdf"
              });
            case 10:
              _context11.next = 15;
              break;
            case 12:
              _context11.prev = 12;
              _context11.t1 = _context11["catch"](4);
              console.error(_context11.t1);
            case 15:
              return _context11.abrupt("return", attachments);
            case 16:
              _context11.prev = 16;
              _data$return_request = data.return_request, shipping_method = _data$return_request.shipping_method, shipping_data = _data$return_request.shipping_data;
              if (!shipping_method) {
                _context11.next = 24;
                break;
              }
              provider = shipping_method.shipping_option.provider_id;
              _context11.next = 22;
              return this.fulfillmentProviderService_.retrieveDocuments(provider, shipping_data, "label");
            case 22:
              lbl = _context11.sent;
              attachments = attachments.concat(lbl.map(function (d) {
                return {
                  name: "return-label.pdf",
                  base64: d.base_64,
                  type: d.type
                };
              }));
            case 24:
              _context11.next = 29;
              break;
            case 26:
              _context11.prev = 26;
              _context11.t2 = _context11["catch"](16);
              console.error(_context11.t2);
            case 29:
              _context11.prev = 29;
              if (!(attachmentGenerator && attachmentGenerator.createReturnInvoice)) {
                _context11.next = 35;
                break;
              }
              _context11.next = 33;
              return attachmentGenerator.createReturnInvoice(data.order, data.return_request.items);
            case 33:
              _base = _context11.sent;
              attachments.push({
                name: "invoice.pdf",
                base64: _base,
                type: "application/pdf"
              });
            case 35:
              _context11.next = 40;
              break;
            case 37:
              _context11.prev = 37;
              _context11.t3 = _context11["catch"](29);
              console.error(_context11.t3);
            case 40:
              return _context11.abrupt("return", attachments);
            case 41:
              _context11.prev = 41;
              if (!(((_this$options_$pdf$en = (_this$options_13 = this.options_) === null || _this$options_13 === void 0 || (_this$options_13 = _this$options_13.pdf) === null || _this$options_13 === void 0 ? void 0 : _this$options_13.enabled) !== null && _this$options_$pdf$en !== void 0 ? _this$options_$pdf$en : false) && attachmentGenerator && attachmentGenerator.createInvoice)) {
                _context11.next = 47;
                break;
              }
              _context11.next = 45;
              return attachmentGenerator.createInvoice(this.options_, data);
            case 45:
              _base2 = _context11.sent;
              attachments.push({
                name: "invoice.pdf",
                base64: _base2,
                type: "application/pdf"
              });
            case 47:
              _context11.next = 53;
              break;
            case 49:
              _context11.prev = 49;
              _context11.t4 = _context11["catch"](41);
              console.log('error ?', _context11.t4);
              console.error(_context11.t4);
            case 53:
              return _context11.abrupt("return", attachments);
            case 54:
              return _context11.abrupt("return", []);
            case 55:
            case "end":
              return _context11.stop();
          }
        }, _callee9, this, [[4, 12], [16, 26], [29, 37], [41, 49]]);
      }));
      function fetchAttachments(_x3, _x4, _x5) {
        return _fetchAttachments.apply(this, arguments);
      }
      return fetchAttachments;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(event, eventData, attachmentGenerator) {
        return _regeneratorRuntime().wrap(function _callee10$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.t0 = event;
              _context12.next = _context12.t0 === "order.placed" ? 3 : _context12.t0 === "order.shipment_created" ? 4 : _context12.t0 === "order.canceled" ? 5 : _context12.t0 === "user.password_reset" ? 6 : _context12.t0 === "customer.password_reset" ? 7 : _context12.t0 === "gift_card.created" ? 8 : 9;
              break;
            case 3:
              return _context12.abrupt("return", this.orderPlacedData(eventData, attachmentGenerator));
            case 4:
              return _context12.abrupt("return", this.orderShipmentCreatedData(eventData, attachmentGenerator));
            case 5:
              return _context12.abrupt("return", this.orderCanceledData(eventData, attachmentGenerator));
            case 6:
              return _context12.abrupt("return", this.userPasswordResetData(eventData, attachmentGenerator));
            case 7:
              return _context12.abrupt("return", this.customerPasswordResetData(eventData, attachmentGenerator));
            case 8:
              return _context12.abrupt("return", this.giftCardData(eventData, attachmentGenerator));
            case 9:
              return _context12.abrupt("return", eventData);
            case 10:
            case "end":
              return _context12.stop();
          }
        }, _callee10, this);
      }));
      function fetchData(_x6, _x7, _x8) {
        return _fetchData.apply(this, arguments);
      }
      return fetchData;
    }()
  }, {
    key: "sendNotification",
    value: function () {
      var _sendNotification = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(event, eventData, attachmentGenerator) {
        var _data$email, _data$customer, _this$options_14;
        var group, action, event_, templateId, data, attachments, sendOptions;
        return _regeneratorRuntime().wrap(function _callee11$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              group = undefined;
              action = undefined;
              _context13.prev = 2;
              event_ = event.split(".", 2);
              group = event_[0];
              action = event_[1];
              if (!(typeof group === "undefined" || typeof action === "undefined" || this.options_.events[group] === undefined || this.options_.events[group][action] === undefined)) {
                _context13.next = 8;
                break;
              }
              return _context13.abrupt("return", false);
            case 8:
              _context13.next = 14;
              break;
            case 10:
              _context13.prev = 10;
              _context13.t0 = _context13["catch"](2);
              console.error(_context13.t0);
              return _context13.abrupt("return", false);
            case 14:
              templateId = this.options_.events[group][action];
              _context13.next = 17;
              return this.fetchData(event, eventData, attachmentGenerator);
            case 17:
              data = _context13.sent;
              _context13.next = 20;
              return this.fetchAttachments(event, data, attachmentGenerator);
            case 20:
              attachments = _context13.sent;
              if (data.locale && _typeof(templateId) === "object") templateId = templateId[data.locale] || Object.values(templateId)[0]; // Fallback to first template if locale is not found
              if (!(templateId === null)) {
                _context13.next = 24;
                break;
              }
              return _context13.abrupt("return", false);
            case 24:
              sendOptions = {
                sender: {
                  email: this.options_.from_email,
                  name: this.options_.from_name
                },
                // Correct structure for sender
                to: [{
                  email: (_data$email = data.email) !== null && _data$email !== void 0 ? _data$email : data === null || data === void 0 || (_data$customer = data.customer) === null || _data$customer === void 0 ? void 0 : _data$customer.email
                }],
                // Correct structure for recipient
                templateId: templateId,
                params: _objectSpread(_objectSpread({}, data), this.options_.default_data)
              };
              if ((_this$options_14 = this.options_) !== null && _this$options_14 !== void 0 && _this$options_14.bcc) sendOptions.Bcc = this.options_.bcc;
              if (attachments !== null && attachments !== void 0 && attachments.length) {
                sendOptions.Attachments = attachments.map(function (a) {
                  return {
                    content: a.base64,
                    Name: a.name,
                    ContentType: a.type,
                    ContentID: "cid:".concat(a.name)
                  };
                });
              }
              _context13.next = 29;
              return this.client_.sendTransacEmail(sendOptions).then(function () {
                return {
                  to: sendOptions.to,
                  status: 'sent',
                  data: sendOptions
                };
              })["catch"](function (error) {
                console.error(error);
                return {
                  to: sendOptions.to,
                  status: 'failed',
                  data: sendOptions
                };
              });
            case 29:
              return _context13.abrupt("return", _context13.sent);
            case 30:
            case "end":
              return _context13.stop();
          }
        }, _callee11, this, [[2, 10]]);
      }));
      function sendNotification(_x9, _x10, _x11) {
        return _sendNotification.apply(this, arguments);
      }
      return sendNotification;
    }()
  }, {
    key: "resendNotification",
    value: function () {
      var _resendNotification = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(notification, config, attachmentGenerator) {
        var sendOptions, attachs;
        return _regeneratorRuntime().wrap(function _callee12$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              sendOptions = _objectSpread(_objectSpread({}, notification.data), {}, {
                To: config.to || notification.to
              });
              _context14.next = 3;
              return this.fetchAttachments(notification.event_name, notification.data.dynamic_template_data, attachmentGenerator);
            case 3:
              attachs = _context14.sent;
              sendOptions.attachments = attachs.map(function (a) {
                return {
                  content: a.base64,
                  filename: a.name,
                  type: a.type,
                  disposition: "attachment",
                  contentId: a.name
                };
              });
              _context14.next = 7;
              return this.client_.sendTransacEmail(sendOptions).then(function () {
                return {
                  to: sendOptions.To,
                  status: 'sent',
                  data: sendOptions
                };
              })["catch"](function (error) {
                console.error(error);
                return {
                  to: sendOptions.To,
                  status: 'failed',
                  data: sendOptions
                };
              });
            case 7:
              return _context14.abrupt("return", _context14.sent);
            case 8:
            case "end":
              return _context14.stop();
          }
        }, _callee12, this);
      }));
      function resendNotification(_x12, _x13, _x14) {
        return _resendNotification.apply(this, arguments);
      }
      return resendNotification;
    }()
  }, {
    key: "sendMail",
    value: function () {
      var _sendMail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(options) {
        return _regeneratorRuntime().wrap(function _callee13$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              this.client_.sendTransacEmail(_objectSpread(_objectSpread({}, options), {}, {
                params: _objectSpread(_objectSpread({}, options.TemplateModel), this.options_.default_data)
              }));
              _context15.next = 8;
              break;
            case 4:
              _context15.prev = 4;
              _context15.t0 = _context15["catch"](0);
              console.log(_context15.t0);
              throw _context15.t0;
            case 8:
            case "end":
              return _context15.stop();
          }
        }, _callee13, this, [[0, 4]]);
      }));
      function sendMail(_x15) {
        return _sendMail.apply(this, arguments);
      }
      return sendMail;
    }()
  }, {
    key: "orderShipmentCreatedData",
    value: function () {
      var _orderShipmentCreatedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(_ref6, attachmentGenerator) {
        var id, fulfillment_id, order, shipment, locale;
        return _regeneratorRuntime().wrap(function _callee14$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              id = _ref6.id, fulfillment_id = _ref6.fulfillment_id;
              _context16.next = 3;
              return this.orderService_.retrieve(id, {
                select: ["shipping_total", "discount_total", "tax_total", "refunded_total", "gift_card_total", "subtotal", "total", "refundable_amount"],
                relations: ["customer", "billing_address", "shipping_address", "discounts", "discounts.rule", "shipping_methods", "shipping_methods.shipping_option", "payments", "fulfillments", "returns", "gift_cards", "gift_card_transactions"]
              });
            case 3:
              order = _context16.sent;
              _context16.next = 6;
              return this.fulfillmentService_.retrieve(fulfillment_id, {
                relations: ["items", "tracking_links"]
              });
            case 6:
              shipment = _context16.sent;
              _context16.next = 9;
              return this.extractLocale(order);
            case 9:
              locale = _context16.sent;
              return _context16.abrupt("return", {
                locale: locale,
                order: order,
                date: shipment.shipped_at.toDateString(),
                email: order.email,
                fulfillment: shipment,
                tracking_links: shipment.tracking_links,
                tracking_number: shipment.tracking_numbers.join(", ")
              });
            case 11:
            case "end":
              return _context16.stop();
          }
        }, _callee14, this);
      }));
      function orderShipmentCreatedData(_x16, _x17) {
        return _orderShipmentCreatedData.apply(this, arguments);
      }
      return orderShipmentCreatedData;
    }()
  }, {
    key: "orderCanceledData",
    value: function () {
      var _orderCanceledData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(_ref7) {
        var id, order, subtotal, tax_total, discount_total, shipping_total, gift_card_total, total, taxRate, currencyCode, items, discounts, giftCards, locale;
        return _regeneratorRuntime().wrap(function _callee15$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              id = _ref7.id;
              _context17.next = 3;
              return this.orderService_.retrieve(id, {
                select: ["shipping_total", "discount_total", "tax_total", "refunded_total", "gift_card_total", "subtotal", "total"],
                relations: ["customer", "billing_address", "shipping_address", "discounts", "discounts.rule", "shipping_methods", "shipping_methods.shipping_option", "payments", "fulfillments", "returns", "gift_cards", "gift_card_transactions"]
              });
            case 3:
              order = _context17.sent;
              subtotal = order.subtotal, tax_total = order.tax_total, discount_total = order.discount_total, shipping_total = order.shipping_total, gift_card_total = order.gift_card_total, total = order.total;
              taxRate = order.tax_rate / 100;
              currencyCode = order.currency_code.toUpperCase();
              items = this.processItems_(order.items, taxRate, currencyCode);
              discounts = [];
              if (order.discounts) {
                discounts = order.discounts.map(function (discount) {
                  return {
                    is_giftcard: false,
                    code: discount.code,
                    descriptor: "".concat(discount.rule.value).concat(discount.rule.type === "percentage" ? "%" : " ".concat(currencyCode))
                  };
                });
              }
              giftCards = [];
              if (order.gift_cards) {
                giftCards = order.gift_cards.map(function (gc) {
                  return {
                    is_giftcard: true,
                    code: gc.code,
                    descriptor: "".concat(gc.value, " ").concat(currencyCode)
                  };
                });
                discounts.concat(giftCards);
              }
              _context17.next = 14;
              return this.extractLocale(order);
            case 14:
              locale = _context17.sent;
              return _context17.abrupt("return", _objectSpread(_objectSpread({}, order), {}, {
                locale: locale,
                has_discounts: order.discounts.length,
                has_gift_cards: order.gift_cards.length,
                date: order.created_at.toDateString(),
                items: items,
                discounts: discounts,
                subtotal: "".concat(this.humanPrice_(subtotal * (1 + taxRate), currencyCode), " ").concat(currencyCode),
                gift_card_total: "".concat(this.humanPrice_(gift_card_total * (1 + taxRate), currencyCode), " ").concat(currencyCode),
                tax_total: "".concat(this.humanPrice_(tax_total, currencyCode), " ").concat(currencyCode),
                discount_total: "".concat(this.humanPrice_(discount_total * (1 + taxRate), currencyCode), " ").concat(currencyCode),
                shipping_total: "".concat(this.humanPrice_(shipping_total * (1 + taxRate), currencyCode), " ").concat(currencyCode),
                total: "".concat(this.humanPrice_(total, currencyCode), " ").concat(currencyCode)
              }));
            case 16:
            case "end":
              return _context17.stop();
          }
        }, _callee15, this);
      }));
      function orderCanceledData(_x18) {
        return _orderCanceledData.apply(this, arguments);
      }
      return orderCanceledData;
    }()
  }, {
    key: "giftCardData",
    value: function () {
      var _giftCardData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(_ref8) {
        var _data$order$email;
        var id, data;
        return _regeneratorRuntime().wrap(function _callee16$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              id = _ref8.id;
              _context18.next = 3;
              return this.giftCardService.retrieve(id, {
                relations: ["order"]
              });
            case 3:
              data = _context18.sent;
              return _context18.abrupt("return", _objectSpread(_objectSpread({}, data), {}, {
                email: (_data$order$email = data.order.email) !== null && _data$order$email !== void 0 ? _data$order$email : ''
              }));
            case 5:
            case "end":
              return _context18.stop();
          }
        }, _callee16, this);
      }));
      function giftCardData(_x19) {
        return _giftCardData.apply(this, arguments);
      }
      return giftCardData;
    }()
  }, {
    key: "orderPlacedData",
    value: function () {
      var _orderPlacedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(_ref9) {
        var _this4 = this,
          _order$shipping_metho;
        var id, order, tax_total, shipping_total, gift_card_total, total, currencyCode, items, discounts, giftCards, locale, discountTotal, discounted_subtotal, subtotal, subtotal_ex_tax;
        return _regeneratorRuntime().wrap(function _callee18$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              id = _ref9.id;
              _context20.next = 3;
              return this.orderService_.retrieve(id, {
                select: ["shipping_total", "discount_total", "tax_total", "refunded_total", "gift_card_total", "subtotal", "total"],
                relations: ["customer", "billing_address", "shipping_address", "discounts", "discounts.rule", "shipping_methods", "shipping_methods.shipping_option", "payments", "fulfillments", "returns", "gift_cards", "gift_card_transactions"]
              });
            case 3:
              order = _context20.sent;
              tax_total = order.tax_total, shipping_total = order.shipping_total, gift_card_total = order.gift_card_total, total = order.total;
              currencyCode = order.currency_code.toUpperCase();
              _context20.next = 8;
              return Promise.all(order.items.map( /*#__PURE__*/function () {
                var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(i) {
                  return _regeneratorRuntime().wrap(function _callee17$(_context19) {
                    while (1) switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.next = 2;
                        return _this4.totalsService_.getLineItemTotals(i, order, {
                          include_tax: true,
                          use_tax_lines: true
                        });
                      case 2:
                        i.totals = _context19.sent;
                        i.thumbnail = _this4.normalizeThumbUrl_(i.thumbnail);
                        i.discounted_price = "".concat(_this4.humanPrice_(i.totals.total / i.quantity, currencyCode), " ").concat(currencyCode);
                        i.price = "".concat(_this4.humanPrice_(i.totals.original_total / i.quantity, currencyCode), " ").concat(currencyCode);
                        return _context19.abrupt("return", i);
                      case 7:
                      case "end":
                        return _context19.stop();
                    }
                  }, _callee17);
                }));
                return function (_x21) {
                  return _ref10.apply(this, arguments);
                };
              }()));
            case 8:
              items = _context20.sent;
              discounts = [];
              if (order.discounts) {
                discounts = order.discounts.map(function (discount) {
                  return {
                    is_giftcard: false,
                    code: discount.code,
                    descriptor: "".concat(discount.rule.value).concat(discount.rule.type === "percentage" ? "%" : " ".concat(currencyCode))
                  };
                });
              }
              giftCards = [];
              if (order.gift_cards) {
                giftCards = order.gift_cards.map(function (gc) {
                  return {
                    is_giftcard: true,
                    code: gc.code,
                    descriptor: "".concat(gc.value, " ").concat(currencyCode)
                  };
                });
                discounts.concat(giftCards);
              }
              _context20.next = 15;
              return this.extractLocale(order);
            case 15:
              locale = _context20.sent;
              // Includes taxes in discount amount
              discountTotal = items.reduce(function (acc, i) {
                return acc + i.totals.original_total - i.totals.total;
              }, 0);
              discounted_subtotal = items.reduce(function (acc, i) {
                return acc + i.totals.total;
              }, 0);
              subtotal = items.reduce(function (acc, i) {
                return acc + i.totals.original_total;
              }, 0);
              subtotal_ex_tax = items.reduce(function (total, i) {
                return total + i.totals.subtotal;
              }, 0);
              return _context20.abrupt("return", _objectSpread(_objectSpread({}, order), {}, {
                locale: locale,
                has_discounts: order.discounts.length,
                has_gift_cards: order.gift_cards.length,
                date: order.created_at.toDateString(),
                items: items,
                discounts: discounts,
                subtotal_ex_tax: "".concat(this.humanPrice_(subtotal_ex_tax, currencyCode), " ").concat(currencyCode),
                subtotal: "".concat(this.humanPrice_(subtotal, currencyCode), " ").concat(currencyCode),
                gift_card_total: "".concat(this.humanPrice_(gift_card_total, currencyCode), " ").concat(currencyCode),
                tax_total: "".concat(this.humanPrice_(tax_total, currencyCode), " ").concat(currencyCode),
                discount_total: "".concat(this.humanPrice_(discountTotal, currencyCode), " ").concat(currencyCode),
                shipping_total: "".concat(this.humanPrice_(shipping_total, currencyCode), " ").concat(currencyCode),
                shipping_total_inc: "".concat(this.humanPrice_((order === null || order === void 0 || (_order$shipping_metho = order.shipping_methods[0]) === null || _order$shipping_metho === void 0 ? void 0 : _order$shipping_metho.price) || shipping_total, currencyCode), " ").concat(currencyCode),
                total: "".concat(this.humanPrice_(total, currencyCode), " ").concat(currencyCode)
              }));
            case 21:
            case "end":
              return _context20.stop();
          }
        }, _callee18, this);
      }));
      function orderPlacedData(_x20) {
        return _orderPlacedData.apply(this, arguments);
      }
      return orderPlacedData;
    }()
  }, {
    key: "userPasswordResetData",
    value: function userPasswordResetData(data) {
      return data;
    }
  }, {
    key: "customerPasswordResetData",
    value: function customerPasswordResetData(data) {
      return data;
    }
  }, {
    key: "processItems_",
    value: function processItems_(items, taxRate, currencyCode) {
      var _this5 = this;
      return items.map(function (i) {
        return _objectSpread(_objectSpread({}, i), {}, {
          thumbnail: _this5.normalizeThumbUrl_(i.thumbnail),
          price: "".concat(currencyCode, " ").concat(_this5.humanPrice_(i.unit_price * (1 + taxRate), currencyCode))
        });
      });
    }
  }, {
    key: "humanPrice_",
    value: function humanPrice_(amount, currency) {
      if (!amount) return "0.00";
      var normalized = (0, _medusaCoreUtils.humanizeAmount)(amount, currency);
      return normalized.toFixed(_medusaCoreUtils.zeroDecimalCurrencies.includes(currency.toLowerCase()) ? 0 : 2);
    }
  }, {
    key: "normalizeThumbUrl_",
    value: function normalizeThumbUrl_(url) {
      if (!url) return null;else if (url.startsWith("http")) return url;else if (url.startsWith("//")) return "https:".concat(url);
      return url;
    }
  }, {
    key: "extractLocale",
    value: function () {
      var _extractLocale = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(fromOrder) {
        var cart;
        return _regeneratorRuntime().wrap(function _callee19$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              if (!fromOrder.cart_id) {
                _context21.next = 14;
                break;
              }
              _context21.prev = 1;
              _context21.next = 4;
              return this.cartService_.retrieve(fromOrder.cart_id, {
                select: ["id", "context"]
              });
            case 4:
              cart = _context21.sent;
              if (!(cart.context && cart.context.locale)) {
                _context21.next = 7;
                break;
              }
              return _context21.abrupt("return", cart.context.locale);
            case 7:
              _context21.next = 14;
              break;
            case 9:
              _context21.prev = 9;
              _context21.t0 = _context21["catch"](1);
              console.log(_context21.t0);
              console.warn("Failed to gather context for order");
              return _context21.abrupt("return", null);
            case 14:
              return _context21.abrupt("return", null);
            case 15:
            case "end":
              return _context21.stop();
          }
        }, _callee19, this, [[1, 9]]);
      }));
      function extractLocale(_x22) {
        return _extractLocale.apply(this, arguments);
      }
      return extractLocale;
    }()
  }]);
}(_medusaInterfaces.NotificationService);
_defineProperty(BrevoService, "identifier", "brevo");
var _default = exports["default"] = BrevoService;