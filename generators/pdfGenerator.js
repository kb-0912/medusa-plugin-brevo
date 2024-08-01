"use strict";

function _instanceof(n, e) { return null != e && "undefined" != typeof Symbol && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](n) : n instanceof e; }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pdfkit = _interopRequireDefault(require("pdfkit"));
var _getStream = _interopRequireDefault(require("get-stream"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && _instanceof(e.prototype, Generator) ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!_instanceof(a, n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var isoAlpha2Countries = {
  AF: "Afghanistan",
  AX: "Aland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, Democratic Republic",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island & Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic Of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle Of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "South Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States Of",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthelemy",
  SH: "Saint Helena",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre And Miquelon",
  VC: "Saint Vincent And Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia And Sandwich Isl.",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks And Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis And Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe"
};
var PdfGenerator = /*#__PURE__*/function () {
  function PdfGenerator() {
    _classCallCheck(this, PdfGenerator);
    this.PDFDocument = _pdfkit["default"];
    this.getStream = _getStream["default"];
    this.top = 0;
    this.item = 0;
    this.lastHeight = 0;
    this.margin = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    this.empty = '__UNDEFINED__';
  }
  return _createClass(PdfGenerator, [{
    key: "startPdf",
    value: function () {
      var _startPdf = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(options) {
        var _options$pdf$settings, _options$pdf, _options$pdf$settings2, _options$pdf2, _options$pdf$settings3, _options$pdf3, _options$pdf$settings4, _options$pdf4, _this$margin$top, _options$pdf5, _options$pdf6;
        var doc, _options$pdf7, _options$pdf8, fontBuffer;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              doc = new this.PDFDocument({
                size: (_options$pdf$settings = options === null || options === void 0 || (_options$pdf = options.pdf) === null || _options$pdf === void 0 || (_options$pdf = _options$pdf.settings) === null || _options$pdf === void 0 ? void 0 : _options$pdf.format) !== null && _options$pdf$settings !== void 0 ? _options$pdf$settings : 'A4',
                margin: (_options$pdf$settings2 = options === null || options === void 0 || (_options$pdf2 = options.pdf) === null || _options$pdf2 === void 0 || (_options$pdf2 = _options$pdf2.settings) === null || _options$pdf2 === void 0 ? void 0 : _options$pdf2.margin) !== null && _options$pdf$settings2 !== void 0 ? _options$pdf$settings2 : this.margin
              });
              this.margin = (_options$pdf$settings3 = options === null || options === void 0 || (_options$pdf3 = options.pdf) === null || _options$pdf3 === void 0 || (_options$pdf3 = _options$pdf3.settings) === null || _options$pdf3 === void 0 ? void 0 : _options$pdf3.margin) !== null && _options$pdf$settings3 !== void 0 ? _options$pdf$settings3 : this.margin;
              this.empty = (_options$pdf$settings4 = options === null || options === void 0 || (_options$pdf4 = options.pdf) === null || _options$pdf4 === void 0 || (_options$pdf4 = _options$pdf4.settings) === null || _options$pdf4 === void 0 ? void 0 : _options$pdf4.empty) !== null && _options$pdf$settings4 !== void 0 ? _options$pdf$settings4 : this.empty;
              this.top = (_this$margin$top = this.margin.top) !== null && _this$margin$top !== void 0 ? _this$margin$top : 0;
              if (options !== null && options !== void 0 && (_options$pdf5 = options.pdf) !== null && _options$pdf5 !== void 0 && (_options$pdf5 = _options$pdf5.settings) !== null && _options$pdf5 !== void 0 && _options$pdf5.font && typeof (options === null || options === void 0 || (_options$pdf6 = options.pdf) === null || _options$pdf6 === void 0 || (_options$pdf6 = _options$pdf6.settings) === null || _options$pdf6 === void 0 ? void 0 : _options$pdf6.font) !== 'string') {
                try {
                  fontBuffer = _fs["default"].readFileSync("".concat(process.cwd(), "/src/fonts/").concat(options === null || options === void 0 || (_options$pdf7 = options.pdf) === null || _options$pdf7 === void 0 || (_options$pdf7 = _options$pdf7.settings) === null || _options$pdf7 === void 0 || (_options$pdf7 = _options$pdf7.font) === null || _options$pdf7 === void 0 ? void 0 : _options$pdf7.file));
                  doc.registerFont(options === null || options === void 0 || (_options$pdf8 = options.pdf) === null || _options$pdf8 === void 0 || (_options$pdf8 = _options$pdf8.settings) === null || _options$pdf8 === void 0 || (_options$pdf8 = _options$pdf8.font) === null || _options$pdf8 === void 0 ? void 0 : _options$pdf8.name, fontBuffer);
                } catch (e) {
                  console.log("Font error: ", e);
                }
              }
              return _context.abrupt("return", doc);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function startPdf(_x) {
        return _startPdf.apply(this, arguments);
      }
      return startPdf;
    }()
  }, {
    key: "generateHeader",
    value: function () {
      var _generateHeader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(doc, options) {
        var _options$pdf9,
          _this = this;
        var header, _header$height, layout, layoutJSON;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              header = options === null || options === void 0 || (_options$pdf9 = options.pdf) === null || _options$pdf9 === void 0 ? void 0 : _options$pdf9.header;
              if (!(header && header !== null && header !== void 0 && header.enabled)) {
                _context2.next = 13;
                break;
              }
              _context2.prev = 2;
              layout = [];
              if (header !== null && header !== void 0 && header.content) {
                layoutJSON = _fs["default"].readFileSync("".concat(process.cwd(), "/src/layouts/").concat(header.content));
                layout = JSON.parse(layoutJSON);
              }
              layout.forEach(function (layoutItem) {
                return _this.generateElement(doc, layoutItem);
              });
              this.top += (_header$height = header === null || header === void 0 ? void 0 : header.height) !== null && _header$height !== void 0 ? _header$height : 50;
              _context2.next = 13;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              console.log("Header error: ", _context2.t0);
              return _context2.abrupt("return");
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 9]]);
      }));
      function generateHeader(_x2, _x3) {
        return _generateHeader.apply(this, arguments);
      }
      return generateHeader;
    }()
  }, {
    key: "generateFooter",
    value: function () {
      var _generateFooter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(doc, options) {
        var _options$pdf10,
          _this2 = this;
        var footer, _footer$height, layout, layoutJSON;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              footer = options === null || options === void 0 || (_options$pdf10 = options.pdf) === null || _options$pdf10 === void 0 ? void 0 : _options$pdf10.footer;
              if (!(footer && footer !== null && footer !== void 0 && footer.enabled)) {
                _context3.next = 13;
                break;
              }
              _context3.prev = 2;
              layout = [];
              if (footer !== null && footer !== void 0 && footer.content) {
                layoutJSON = _fs["default"].readFileSync("".concat(process.cwd(), "/src/layouts/").concat(footer.content));
                layout = JSON.parse(layoutJSON);
              }
              layout.forEach(function (layoutItem) {
                return _this2.generateElement(doc, layoutItem);
              });
              this.top += (_footer$height = footer === null || footer === void 0 ? void 0 : footer.height) !== null && _footer$height !== void 0 ? _footer$height : 50;
              _context3.next = 13;
              break;
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              console.log("Footer error: ", _context3.t0);
              return _context3.abrupt("return");
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[2, 9]]);
      }));
      function generateFooter(_x4, _x5) {
        return _generateFooter.apply(this, arguments);
      }
      return generateFooter;
    }()
  }, {
    key: "getVariable",
    value: function getVariable(keys, data) {
      var _this3 = this;
      var value = keys[0] === 'item' ? data === null || data === void 0 ? void 0 : data.items[this.item] : data;
      keys.shift();
      keys.forEach(function (k) {
        var _value$k;
        return value = (_value$k = value[k]) !== null && _value$k !== void 0 ? _value$k : _this3.empty;
      });
      return value;
    }
  }, {
    key: "parseVariables",
    value: function parseVariables(text, data) {
      var _this4 = this;
      var ifRegex = /\{\{\s*if\s+([\w\s\.]+)\s*\}\}([\s\S]*?)\{\{\s*endif\s*\}\}/gi;
      text = text.replace(ifRegex, function (match, statement, content) {
        var keys = statement.startsWith('not ') ? statement.split('not ')[1].split('.') : statement.split('.');
        var value = _this4.getVariable(keys, data);
        if (value === _this4.empty || value === false || value === "") return statement.startsWith('not ') ? content : '';
        return statement.startsWith('not ') ? '' : content;
      });
      var regex = /{{\s(.*?)(?=\s}})\s}}/ig;
      return text.replace(regex, function (match, key) {
        var _value;
        var _key$split = key.split(' | '),
          _key$split2 = _slicedToArray(_key$split, 2),
          keys = _key$split2[0],
          filter = _key$split2[1];
        keys = keys.split('.');
        var value = _this4.getVariable(keys, data);
        if (filter) {
          if (filter.startsWith('date')) {
            var _JSON$parse;
            var dateRegex = /date\(['"]([^'"]+)['"][\,\s]{0,2}([^))]*)\)/i;
            var _dateRegex$exec = dateRegex.exec(filter),
              _dateRegex$exec2 = _slicedToArray(_dateRegex$exec, 3),
              _ = _dateRegex$exec2[0],
              locale = _dateRegex$exec2[1],
              format = _dateRegex$exec2[2];
            value = new Date(value).toLocaleDateString(locale, (_JSON$parse = JSON.parse(format.replaceAll("'", '"'))) !== null && _JSON$parse !== void 0 ? _JSON$parse : {});
          } else if (filter.startsWith('currency')) {
            var numberRegex = /currency\(['"]([^'"]+)['"]\)/i;
            var _numberRegex$exec = numberRegex.exec(filter),
              _numberRegex$exec2 = _slicedToArray(_numberRegex$exec, 2),
              _2 = _numberRegex$exec2[0],
              _locale = _numberRegex$exec2[1];
            if (typeof value === 'string') value = parseFloat(value.replace(data === null || data === void 0 ? void 0 : data.currency_code.toUpperCase(), ''));
            value = new Intl.NumberFormat(_locale, {
              style: 'currency',
              currency: data === null || data === void 0 ? void 0 : data.currency_code.toUpperCase()
            }).format(value / 100);
          } else if (filter.startsWith('country')) {
            var _isoAlpha2Countries$v;
            if (typeof value === 'string') value = (_isoAlpha2Countries$v = isoAlpha2Countries[value.toUpperCase()]) !== null && _isoAlpha2Countries$v !== void 0 ? _isoAlpha2Countries$v : "";
          }
        }
        return (_value = value) !== null && _value !== void 0 ? _value : _this4.empty;
      });
    }
  }, {
    key: "generateElement",
    value: function generateElement(doc, layoutItem, data) {
      var _layoutItem$y,
        _layoutItem$x,
        _layoutItem$y2,
        _layoutItem$lines,
        _layoutItem$color,
        _layoutItem$width,
        _layoutItem$x2,
        _layoutItem$y3,
        _layoutItem$width2,
        _layoutItem$y4,
        _layoutItem$height,
        _layoutItem$x3,
        _layoutItem$columns,
        _this5 = this;
      switch (layoutItem.type) {
        case 'image':
          var imageOptions = {
            "fit": layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.fit
          };
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.align) imageOptions.align = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.align;
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.valign) imageOptions.valign = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.valign;
          doc.image("".concat(process.cwd(), "/src/images/").concat(layoutItem.image), layoutItem.x, this.margin.left + ((_layoutItem$y = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.y) !== null && _layoutItem$y !== void 0 ? _layoutItem$y : 0), imageOptions);
          break;
        case 'text':
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.color) doc.fillColor(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.color);
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.font) doc.font(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.font);
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.size) doc.fontSize(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.size);
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.width && typeof (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) === 'string') layoutItem.width = parseInt(doc.page.width - this.margin.left - this.margin.right);else if (layoutItem !== null && layoutItem !== void 0 && layoutItem.width && typeof (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) === 'number') layoutItem.width = parseInt(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width);
          var parsedText = this.parseVariables(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.text, data);
          var textOptions = Object.fromEntries(Object.entries(layoutItem).filter(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
              key = _ref2[0];
            return !['type', 'color', 'font', 'size', 'text', 'x', 'y'].includes(key);
          }));
          this.lastHeight = doc.heightOfString(parsedText, textOptions);
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.x || layoutItem !== null && layoutItem !== void 0 && layoutItem.y) doc.text(this.parseVariables(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.text, data), this.margin.left + ((_layoutItem$x = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.x) !== null && _layoutItem$x !== void 0 ? _layoutItem$x : 0), (_layoutItem$y2 = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.y) !== null && _layoutItem$y2 !== void 0 ? _layoutItem$y2 : this.top, textOptions);else doc.text(this.parseVariables(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.text, data), this.margin.left, this.top, textOptions);
          //this.top += textHeight
          break;
        case 'moveDown':
          //doc.moveDown(layoutItem?.lines??1)
          // fake movedown by altering this.top + last fontsize * 1.5 or use measured height
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.useMeasure) this.top += parseInt(this.lastHeight);else this.top += parseInt(doc._fontSize) * 1.5 * ((_layoutItem$lines = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.lines) !== null && _layoutItem$lines !== void 0 ? _layoutItem$lines : 1);
          break;
        case 'hr':
          doc.strokeColor((_layoutItem$color = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.color) !== null && _layoutItem$color !== void 0 ? _layoutItem$color : '#aaaaaa').lineWidth((_layoutItem$width = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) !== null && _layoutItem$width !== void 0 ? _layoutItem$width : 1).moveTo((_layoutItem$x2 = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.x) !== null && _layoutItem$x2 !== void 0 ? _layoutItem$x2 : this.margin.left, (_layoutItem$y3 = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.y) !== null && _layoutItem$y3 !== void 0 ? _layoutItem$y3 : this.top).lineTo((_layoutItem$width2 = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) !== null && _layoutItem$width2 !== void 0 ? _layoutItem$width2 : doc.page.width - this.margin.right, (_layoutItem$y4 = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.y) !== null && _layoutItem$y4 !== void 0 ? _layoutItem$y4 : this.top).stroke();
          this.top += (_layoutItem$height = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.height) !== null && _layoutItem$height !== void 0 ? _layoutItem$height : 10;
          break;
        case 'tableRow':
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.color) doc.fillColor(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.color);
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.font) doc.font(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.font);
          if (layoutItem !== null && layoutItem !== void 0 && layoutItem.size) doc.fontSize(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.size);
          var xPos = this.margin.left + ((_layoutItem$x3 = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.x) !== null && _layoutItem$x3 !== void 0 ? _layoutItem$x3 : 0);
          layoutItem === null || layoutItem === void 0 || (_layoutItem$columns = layoutItem.columns) === null || _layoutItem$columns === void 0 || _layoutItem$columns.forEach(function (column) {
            var _column$y;
            if (column !== null && column !== void 0 && column.color) doc.fillColor(column === null || column === void 0 ? void 0 : column.color);
            if (column !== null && column !== void 0 && column.font) doc.font(column === null || column === void 0 ? void 0 : column.font);
            if (column !== null && column !== void 0 && column.size) doc.fontSize(column === null || column === void 0 ? void 0 : column.size);
            if (column !== null && column !== void 0 && column.width && typeof (column === null || column === void 0 ? void 0 : column.width) === 'string') column.width = parseInt(doc.page.width - _this5.margin.left - _this5.margin.right);else if (column !== null && column !== void 0 && column.width && typeof (column === null || column === void 0 ? void 0 : column.width) === 'number') column.width = parseInt(column === null || column === void 0 ? void 0 : column.width);
            var parsedText = _this5.parseVariables(column === null || column === void 0 ? void 0 : column.text, data);
            var columnOptions = Object.fromEntries(Object.entries(column).filter(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 1),
                key = _ref4[0];
              return !['type', 'color', 'font', 'size', 'text', 'x', 'y'].includes(key);
            }));
            doc.text(parsedText, xPos, (_column$y = column === null || column === void 0 ? void 0 : column.y) !== null && _column$y !== void 0 ? _column$y : _this5.top, columnOptions);
            if (column !== null && column !== void 0 && column.width) xPos += column === null || column === void 0 ? void 0 : column.width;else xPos += doc.widthOfString(parsedText, columnOptions);
          });
          this.top += doc._fontSize * 1.5;
          break;
        default:
          break;
      }
    }
  }, {
    key: "createInvoice",
    value: function () {
      var _createInvoice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(options, order) {
        var _this6 = this;
        var doc, _options$pdf11, layoutJSON, layout, itemLayout, itemLayoutRunning, docBuffer;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.startPdf(options);
            case 2:
              doc = _context4.sent;
              _context4.next = 5;
              return this.generateHeader(doc, options);
            case 5:
              try {
                layoutJSON = _fs["default"].readFileSync("".concat(process.cwd(), "/src/layouts/").concat(options === null || options === void 0 || (_options$pdf11 = options.pdf) === null || _options$pdf11 === void 0 || (_options$pdf11 = _options$pdf11.templates) === null || _options$pdf11 === void 0 ? void 0 : _options$pdf11.invoice));
                layout = JSON.parse(layoutJSON);
                itemLayout = [];
                itemLayoutRunning = false;
                Object.values(layout).forEach(function (layoutItem) {
                  if ((layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.type) === 'itemLoop' || itemLayoutRunning === true && (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.type) !== 'itemLoopEnd') {
                    itemLayoutRunning = true;
                    itemLayout.push(layoutItem);
                  } else if ((layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.type) === 'itemLoopEnd') {
                    itemLayoutRunning = false;
                    order.items.forEach(function (item, index) {
                      _this6.item = index;
                      itemLayout.forEach(function (layoutItem) {
                        return _this6.generateElement(doc, layoutItem, order);
                      });
                    });
                  } else _this6.generateElement(doc, layoutItem, order);
                });
              } catch (e) {
                console.log("Invoice error: ", e);
              }
              _context4.next = 8;
              return this.generateFooter(doc, options);
            case 8:
              _context4.prev = 8;
              doc.end();
              _context4.next = 12;
              return this.getStream.buffer(doc);
            case 12:
              docBuffer = _context4.sent;
              return _context4.abrupt("return", docBuffer.toString('base64'));
            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](8);
              console.log("Invoice error: ", _context4.t0);
              return _context4.abrupt("return", null);
            case 20:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[8, 16]]);
      }));
      function createInvoice(_x6, _x7) {
        return _createInvoice.apply(this, arguments);
      }
      return createInvoice;
    }()
  }, {
    key: "createReturnInvoice",
    value: function () {
      var _createReturnInvoice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(order, returnItems) {
        var doc, shipping_address, billing_address, y, _iterator, _step, item, docBuffer;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              doc = new this.PDFDocument({
                size: 'A4',
                margin: 50
              });
              shipping_address = order.shipping_address, billing_address = order.billing_address;
              doc.font('Helvetica-Bold').fontSize(25).text('Return Invoice', 50, 50);
              doc.font('Helvetica').fontSize(12).text("Return ID: ".concat(order.id), 50, 80);
              doc.font('Helvetica').fontSize(12).text("Order ID: ".concat(order.id), 50, 100);
              doc.font('Helvetica').fontSize(12).text("Return Date: ".concat(new Date().toISOString()), 50, 120);
              doc.font('Helvetica').fontSize(12).text("Billing Address: ".concat(billing_address.first_name, " ").concat(billing_address.last_name), 50, 140);
              doc.font('Helvetica').fontSize(12).text("Shipping Address: ".concat(shipping_address.first_name, " ").concat(shipping_address.last_name), 50, 160);
              doc.font('Helvetica').fontSize(12).text("Email: ".concat(order.email), 50, 180);
              doc.font('Helvetica').fontSize(12).text("Phone: ".concat(order.phone), 50, 200);
              doc.font('Helvetica').fontSize(12).text("Items:", 50, 220);
              y = 240;
              _iterator = _createForOfIteratorHelper(returnItems);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  item = _step.value;
                  doc.font('Helvetica').fontSize(12).text("".concat(item.quantity, " x ").concat(item.title), 50, y);
                  y += 20;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              doc.end();
              _context5.next = 17;
              return this.getStream.buffer(doc);
            case 17:
              docBuffer = _context5.sent;
              return _context5.abrupt("return", docBuffer.toString('base64'));
            case 19:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function createReturnInvoice(_x8, _x9) {
        return _createReturnInvoice.apply(this, arguments);
      }
      return createReturnInvoice;
    }()
  }]);
}();
var _default = exports["default"] = PdfGenerator;