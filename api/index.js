"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _instanceof(n, e) { return null != e && "undefined" != typeof Symbol && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](n) : n instanceof e; }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _routes = _interopRequireDefault(require("./routes"));
var _medusaCoreUtils = require("medusa-core-utils");
var _pdfGenerator = _interopRequireDefault(require("../generators/pdfGenerator"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && _instanceof(e.prototype, Generator) ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // writing pdf to file
var _default = exports["default"] = function _default(container) {
  var app = (0, _express.Router)();
  app.get("/hello", function (req, res) {
    res.json({
      message: "Welcome to My Store!"
    });
  });
  app.get("/export", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
      var pdfGen, orderService, orderIds, totalsService, options, _i, _orderIds, orderId, data, _options$pdf$enabled, _options$pdf, base64, dir, filename;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            pdfGen = new _pdfGenerator["default"]();
            orderService = req.scope.resolve("orderService");
            orderIds = ['order_01HBBZVQP85VNG96J683B5K88C', 'order_01HBEJGAG2MG3F86ZEG4VFJXN7', 'order_01HD0W7BAK9H2KG1NE4MWF2WE9', 'order_01HBGKGB53GT92913E81QDVQS5', 'order_01HBP8DT5R6RK3VBFGK710EQ0V', 'order_01HBP99PP63CHJN9P2KH5GZSAP', 'order_01HBTP2GJVBAJ9CXGEEKMZW3VA', 'order_01HBVH1WYSG9T7R7ZA99TZVE6Y', 'order_01HCAZ40NNT6R66R9RC64PKEFC', 'order_01HCH78FBCQG9GYQWXJBPVMX3J', 'order_01HD6WCPQ18BDWAF7XEV0XWR8E', 'order_01HCMV7YE2V6SZQ9J7VAA8PV85', 'order_01HDC11S8MPPK8BJ238TN8WFT9', 'order_01HDPACBK1Y89Q0ZY6XSEQAXHW', 'order_01HDV1S5SDNY31THZGNDTVHCAY', 'order_01HE0X59MMQQDTBAP1TFVW0Q03', 'order_01HE30PAP9DEHPA2GWK8E5QZGD', 'order_01HE8PNWNXMKMD1XP6AYNEPZXT', 'order_01HED71202RGBC7TBFD8Z22M16', 'order_01HEDX6F46C0FGXCBWGSAYGGWF', 'order_01HF9QWVSS478R9QX6S4B5CP44', 'order_01HEE6Z79AXNMZ0J6XFQS5Y3FE', 'order_01HFCABG830N64JDFK279QJF1G', 'order_01HFEVJTX34PZ331D97DP31RVH', 'order_01HFQA4KCCW4GD8V1KSHHMC3JP', 'order_01HG5N3320NA7CZZ6QWBG2QWGZ', 'order_01HGB4YGH07TGXQP9K3Y01CBEY', 'order_01HGBABS2BT6NVVJBDT06E3NKE', 'order_01HGGNV3X9CXH7957AZAXSBQJX', 'order_01HHD97J3JZBD007SM9ZD0Y7JM', 'order_01HGJMMW3P5RT4EAR92NP4DP5V', 'order_01HGWHMG7F512Z5ATJT26J316B', 'order_01HH0J0V82A2TD0MB507KQ5XXJ', 'order_01HHD36KQ6P4XWXK0H6TYZXRR1', 'order_01HHHGSDCB7RDH2T4N7G4GMYE0', 'order_01HHWPKFTV2ZA2MEWGS60GFZ6Y', 'order_01HJK113GHJ4XM0VXQ1JG32SZ9', 'order_01HK34278GAD734XC01KV6497Q', 'order_01HJQTP3GMW8T65EKM3ZH2MJJ3', 'order_01HKJ1CGVJH6729N6YFQY9QH8T', 'order_01HKHZBNNFRDQ5R39SHCYT1RAD', 'order_01HMKFED9TCHBK7KP6C3NVZ8GD', 'order_01HMNDFB41876NP25ZF4G62FSM']; //req.params.id;
            totalsService = req.scope.resolve("totalsService");
            options = {
              pdf: {
                enabled: true,
                settings: {
                  font: process.env.POSTMARK_PDF_FONT || 'Helvetica',
                  format: process.env.POSTMARK_PDF_FORMAT || 'A4',
                  margin: {
                    top: process.env.POSTMARK_PDF_MARGIN_TOP || 50,
                    right: process.env.POSTMARK_PDF_MARGIN_RIGHT || 50,
                    bottom: process.env.POSTMARK_PDF_MARGIN_BOTTOM || 50,
                    left: process.env.POSTMARK_PDF_MARGIN_LEFT || 50
                  }
                },
                header: {
                  enabled: true,
                  content: 'header.json',
                  height: process.env.POSTMARK_PDF_HEADER_HEIGHT || 50
                },
                footer: {
                  enabled: true,
                  content: 'footer.json'
                },
                templates: {
                  invoice: 'createInvoice.json',
                  credit_note: process.env.POSTMARK_PDF_CREDIT_NOTE_TEMPLATE || null,
                  return_invoice: process.env.POSTMARK_PDF_RETURN_INVOICE_TEMPLATE || null
                }
              }
            };
            _i = 0, _orderIds = orderIds;
          case 6:
            if (!(_i < _orderIds.length)) {
              _context.next = 30;
              break;
            }
            orderId = _orderIds[_i];
            _context.next = 10;
            return getOrderData(orderService, totalsService, orderId);
          case 10:
            data = _context.sent;
            _context.prev = 11;
            if (!(((_options$pdf$enabled = options === null || options === void 0 || (_options$pdf = options.pdf) === null || _options$pdf === void 0 ? void 0 : _options$pdf.enabled) !== null && _options$pdf$enabled !== void 0 ? _options$pdf$enabled : false) && pdfGen && pdfGen.createInvoice)) {
              _context.next = 21;
              break;
            }
            _context.next = 15;
            return pdfGen.createInvoice(options, data);
          case 15:
            base64 = _context.sent;
            // attachments.push({
            //     name: "invoice.pdf",
            //     base64,
            //     type: "application/pdf",
            // })
            // res.type('application/pdf');
            // res.header('Content-Disposition', `attachment; filename="${orderId}.pdf"`);
            // res.send(Buffer.from(base64, 'base64'));
            // write tot file as real pdf, not base64
            dir = _path["default"].join(__dirname, '..', '..', 'pdf');
            if (!_fs["default"].existsSync(dir)) {
              _fs["default"].mkdirSync(dir);
            }
            console.log(dir);
            filename = _path["default"].join(dir, orderId + '.pdf');
            _fs["default"].writeFile(filename, Buffer.from(base64, 'base64'), function (err) {
              if (err) throw err;
              console.log('The file has been saved!');
            });
          case 21:
            _context.next = 27;
            break;
          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](11);
            console.log('error ?', _context.t0);
            console.error(_context.t0);
          case 27:
            _i++;
            _context.next = 6;
            break;
          case 30:
            res.json({
              message: "Welcome to My Store!"
            });
          case 31:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[11, 23]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  var getOrderData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(orderService, totalsService, orderId) {
      var _order$shipping_metho;
      var order, tax_total, shipping_total, gift_card_total, total, currencyCode, items, discounts, giftCards, locale, discountTotal, discounted_subtotal, subtotal, subtotal_ex_tax;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return orderService.retrieve(orderId, {
              select: ["shipping_total", "discount_total", "tax_total", "refunded_total", "gift_card_total", "subtotal", "total"],
              relations: ["customer", "billing_address", "shipping_address", "discounts", "discounts.rule", "shipping_methods", "shipping_methods.shipping_option", "payments", "fulfillments", "returns", "gift_cards", "gift_card_transactions"]
            });
          case 2:
            order = _context3.sent;
            tax_total = order.tax_total, shipping_total = order.shipping_total, gift_card_total = order.gift_card_total, total = order.total;
            currencyCode = order.currency_code.toUpperCase();
            _context3.next = 7;
            return Promise.all(order.items.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(i) {
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return totalsService.getLineItemTotals(i, order, {
                        include_tax: true,
                        use_tax_lines: true
                      });
                    case 2:
                      i.totals = _context2.sent;
                      i.thumbnail = normalizeThumbUrl_(i.thumbnail);
                      i.discounted_price = "".concat(humanPrice_(i.totals.total / i.quantity, currencyCode), " ").concat(currencyCode);
                      i.price = "".concat(humanPrice_(i.totals.original_total / i.quantity, currencyCode), " ").concat(currencyCode);
                      return _context2.abrupt("return", i);
                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function (_x6) {
                return _ref3.apply(this, arguments);
              };
            }()));
          case 7:
            items = _context3.sent;
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
            locale = 'nl'; // Includes taxes in discount amount
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
            return _context3.abrupt("return", _objectSpread(_objectSpread({}, order), {}, {
              locale: locale,
              has_discounts: order.discounts.length,
              has_gift_cards: order.gift_cards.length,
              date: order.created_at.toDateString(),
              items: items,
              discounts: discounts,
              subtotal_ex_tax: "".concat(humanPrice_(subtotal_ex_tax, currencyCode), " ").concat(currencyCode),
              subtotal: "".concat(humanPrice_(subtotal, currencyCode), " ").concat(currencyCode),
              gift_card_total: "".concat(humanPrice_(gift_card_total, currencyCode), " ").concat(currencyCode),
              tax_total: "".concat(humanPrice_(tax_total, currencyCode), " ").concat(currencyCode),
              discount_total: "".concat(humanPrice_(discountTotal, currencyCode), " ").concat(currencyCode),
              shipping_total: "".concat(humanPrice_(shipping_total, currencyCode), " ").concat(currencyCode),
              shipping_total_inc: "".concat(humanPrice_((order === null || order === void 0 || (_order$shipping_metho = order.shipping_methods[0]) === null || _order$shipping_metho === void 0 ? void 0 : _order$shipping_metho.price) || shipping_total, currencyCode), " ").concat(currencyCode),
              total: "".concat(humanPrice_(total, currencyCode), " ").concat(currencyCode)
            }));
          case 18:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function getOrderData(_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
  var humanPrice_ = function humanPrice_(amount, currency) {
    if (!amount) return "0.00";
    var normalized = (0, _medusaCoreUtils.humanizeAmount)(amount, currency);
    return normalized.toFixed(_medusaCoreUtils.zeroDecimalCurrencies.includes(currency.toLowerCase()) ? 0 : 2);
  };
  var normalizeThumbUrl_ = function normalizeThumbUrl_(url) {
    if (!url) return null;else if (url.startsWith("http")) return url;else if (url.startsWith("//")) return "https:".concat(url);
    return url;
  };
  (0, _routes["default"])(app);
  return app;
};