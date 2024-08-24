"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfkit_1 = __importDefault(require("pdfkit"));
const get_stream_1 = __importDefault(require("get-stream"));
const fs_1 = __importDefault(require("fs"));
const isoAlpha2Countries = {
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
    ZW: "Zimbabwe",
};
class PdfGenerator {
    constructor() {
        this.PDFDocument = pdfkit_1.default;
        this.getStream = get_stream_1.default;
        this.top = 0;
        this.item = 0;
        this.lastHeight = 0;
        this.margin = { top: 0, left: 0, right: 0, bottom: 0 };
        this.empty = '__UNDEFINED__';
    }
    async startPdf(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        const doc = new this.PDFDocument({
            size: (_c = (_b = (_a = options === null || options === void 0 ? void 0 : options.pdf) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.format) !== null && _c !== void 0 ? _c : 'A4',
            margin: (_f = (_e = (_d = options === null || options === void 0 ? void 0 : options.pdf) === null || _d === void 0 ? void 0 : _d.settings) === null || _e === void 0 ? void 0 : _e.margin) !== null && _f !== void 0 ? _f : this.margin,
        });
        this.margin = (_j = (_h = (_g = options === null || options === void 0 ? void 0 : options.pdf) === null || _g === void 0 ? void 0 : _g.settings) === null || _h === void 0 ? void 0 : _h.margin) !== null && _j !== void 0 ? _j : this.margin;
        this.empty = (_m = (_l = (_k = options === null || options === void 0 ? void 0 : options.pdf) === null || _k === void 0 ? void 0 : _k.settings) === null || _l === void 0 ? void 0 : _l.empty) !== null && _m !== void 0 ? _m : this.empty;
        this.top = (_o = this.margin.top) !== null && _o !== void 0 ? _o : 0;
        if (((_q = (_p = options === null || options === void 0 ? void 0 : options.pdf) === null || _p === void 0 ? void 0 : _p.settings) === null || _q === void 0 ? void 0 : _q.font) && typeof ((_s = (_r = options === null || options === void 0 ? void 0 : options.pdf) === null || _r === void 0 ? void 0 : _r.settings) === null || _s === void 0 ? void 0 : _s.font) !== 'string') {
            try {
                const fontBuffer = fs_1.default.readFileSync(`${process.cwd()}/src/fonts/${(_v = (_u = (_t = options === null || options === void 0 ? void 0 : options.pdf) === null || _t === void 0 ? void 0 : _t.settings) === null || _u === void 0 ? void 0 : _u.font) === null || _v === void 0 ? void 0 : _v.file}`);
                doc.registerFont((_y = (_x = (_w = options === null || options === void 0 ? void 0 : options.pdf) === null || _w === void 0 ? void 0 : _w.settings) === null || _x === void 0 ? void 0 : _x.font) === null || _y === void 0 ? void 0 : _y.name, fontBuffer);
            }
            catch (e) {
                console.log("Font error: ", e);
            }
        }
        return doc;
    }
    async generateHeader(doc, options) {
        var _a, _b;
        const header = (_a = options === null || options === void 0 ? void 0 : options.pdf) === null || _a === void 0 ? void 0 : _a.header;
        if (header && (header === null || header === void 0 ? void 0 : header.enabled)) {
            try {
                let layout = [];
                if (header === null || header === void 0 ? void 0 : header.content) {
                    const layoutJSON = fs_1.default.readFileSync(`${process.cwd()}/src/layouts/${header.content}`);
                    layout = JSON.parse(layoutJSON);
                }
                layout.forEach((layoutItem) => this.generateElement(doc, layoutItem));
                this.top += (_b = header === null || header === void 0 ? void 0 : header.height) !== null && _b !== void 0 ? _b : 50;
            }
            catch (e) {
                console.log("Header error: ", e);
                return;
            }
        }
    }
    async generateFooter(doc, options) {
        var _a, _b;
        const footer = (_a = options === null || options === void 0 ? void 0 : options.pdf) === null || _a === void 0 ? void 0 : _a.footer;
        if (footer && (footer === null || footer === void 0 ? void 0 : footer.enabled)) {
            try {
                let layout = [];
                if (footer === null || footer === void 0 ? void 0 : footer.content) {
                    const layoutJSON = fs_1.default.readFileSync(`${process.cwd()}/src/layouts/${footer.content}`);
                    layout = JSON.parse(layoutJSON);
                }
                layout.forEach((layoutItem) => this.generateElement(doc, layoutItem));
                this.top += (_b = footer === null || footer === void 0 ? void 0 : footer.height) !== null && _b !== void 0 ? _b : 50;
            }
            catch (e) {
                console.log("Footer error: ", e);
                return;
            }
        }
    }
    getVariable(keys, data) {
        let value = keys[0] === 'item' ? data === null || data === void 0 ? void 0 : data.items[this.item] : data;
        keys.shift();
        keys.forEach(k => { var _a; return value = (_a = value[k]) !== null && _a !== void 0 ? _a : this.empty; });
        return value;
    }
    parseVariables(text, data) {
        const ifRegex = /\{\{\s*if\s+([\w\s\.]+)\s*\}\}([\s\S]*?)\{\{\s*endif\s*\}\}/gi;
        text = text.replace(ifRegex, (match, statement, content) => {
            const keys = statement.startsWith('not ') ? statement.split('not ')[1].split('.') : statement.split('.');
            const value = this.getVariable(keys, data);
            if (value === this.empty || value === false || value === "")
                return statement.startsWith('not ') ? content : '';
            return statement.startsWith('not ') ? '' : content;
        });
        const regex = /{{\s(.*?)(?=\s}})\s}}/ig;
        return text.replace(regex, (match, key) => {
            var _a, _b;
            let [keys, filter] = key.split(' | ');
            keys = keys.split('.');
            let value = this.getVariable(keys, data);
            if (filter) {
                if (filter.startsWith('date')) {
                    const dateRegex = /date\(['"]([^'"]+)['"][\,\s]{0,2}([^))]*)\)/i;
                    const [_, locale, format] = dateRegex.exec(filter);
                    value = new Date(value).toLocaleDateString(locale, (_a = JSON.parse(format.replaceAll("'", '"'))) !== null && _a !== void 0 ? _a : {});
                }
                else if (filter.startsWith('currency')) {
                    const numberRegex = /currency\(['"]([^'"]+)['"]\)/i;
                    const [_, locale] = numberRegex.exec(filter);
                    if (typeof value === 'string')
                        value = parseFloat(value.replace(data === null || data === void 0 ? void 0 : data.currency_code.toUpperCase(), ''));
                    value = new Intl.NumberFormat(locale, { style: 'currency', currency: data === null || data === void 0 ? void 0 : data.currency_code.toUpperCase() }).format(value / 100);
                }
                else if (filter.startsWith('country')) {
                    if (typeof value === 'string')
                        value = (_b = isoAlpha2Countries[value.toUpperCase()]) !== null && _b !== void 0 ? _b : "";
                }
            }
            return value !== null && value !== void 0 ? value : this.empty;
        });
    }
    generateElement(doc, layoutItem, data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        switch (layoutItem.type) {
            case 'image':
                const imageOptions = { "fit": layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.fit };
                if (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.align)
                    imageOptions.align = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.align;
                if (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.valign)
                    imageOptions.valign = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.valign;
                doc.image(`${process.cwd()}/src/images/${layoutItem.image}`, layoutItem.x, this.margin.left + ((_a = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.y) !== null && _a !== void 0 ? _a : 0), imageOptions);
                break;
            case 'text':
                if (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.color)
                    doc.fillColor(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.color);
                if (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.font)
                    doc.font(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.font);
                if (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.size)
                    doc.fontSize(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.size);
                if ((layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) && typeof (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) === 'string')
                    layoutItem.width = parseInt(doc.page.width - this.margin.left - this.margin.right);
                else if ((layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) && typeof (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) === 'number')
                    layoutItem.width = parseInt(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width);
                const parsedText = this.parseVariables(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.text, data);
                const textOptions = Object.fromEntries(Object.entries(layoutItem).filter(([key]) => !['type', 'color', 'font', 'size', 'text', 'x', 'y'].includes(key)));
                this.lastHeight = doc.heightOfString(parsedText, textOptions);
                if ((layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.x) || (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.y))
                    doc.text(this.parseVariables(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.text, data), this.margin.left + ((_b = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.x) !== null && _b !== void 0 ? _b : 0), (_c = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.y) !== null && _c !== void 0 ? _c : this.top, textOptions);
                else
                    doc.text(this.parseVariables(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.text, data), this.margin.left, this.top, textOptions);
                //this.top += textHeight
                break;
            case 'moveDown':
                //doc.moveDown(layoutItem?.lines??1)
                // fake movedown by altering this.top + last fontsize * 1.5 or use measured height
                if (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.useMeasure)
                    this.top += parseInt(this.lastHeight);
                else
                    this.top += (parseInt(doc._fontSize) * 1.5) * ((_d = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.lines) !== null && _d !== void 0 ? _d : 1);
                break;
            case 'hr':
                doc
                    .strokeColor((_e = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.color) !== null && _e !== void 0 ? _e : '#aaaaaa')
                    .lineWidth((_f = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) !== null && _f !== void 0 ? _f : 1)
                    .moveTo((_g = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.x) !== null && _g !== void 0 ? _g : this.margin.left, (_h = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.y) !== null && _h !== void 0 ? _h : this.top)
                    .lineTo((_j = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.width) !== null && _j !== void 0 ? _j : (doc.page.width - this.margin.right), (_k = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.y) !== null && _k !== void 0 ? _k : this.top)
                    .stroke();
                this.top += (_l = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.height) !== null && _l !== void 0 ? _l : 10;
                break;
            case 'tableRow':
                if (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.color)
                    doc.fillColor(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.color);
                if (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.font)
                    doc.font(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.font);
                if (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.size)
                    doc.fontSize(layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.size);
                let xPos = this.margin.left + ((_m = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.x) !== null && _m !== void 0 ? _m : 0);
                (_o = layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.columns) === null || _o === void 0 ? void 0 : _o.forEach((column) => {
                    var _a;
                    if (column === null || column === void 0 ? void 0 : column.color)
                        doc.fillColor(column === null || column === void 0 ? void 0 : column.color);
                    if (column === null || column === void 0 ? void 0 : column.font)
                        doc.font(column === null || column === void 0 ? void 0 : column.font);
                    if (column === null || column === void 0 ? void 0 : column.size)
                        doc.fontSize(column === null || column === void 0 ? void 0 : column.size);
                    if ((column === null || column === void 0 ? void 0 : column.width) && typeof (column === null || column === void 0 ? void 0 : column.width) === 'string')
                        column.width = parseInt(doc.page.width - this.margin.left - this.margin.right);
                    else if ((column === null || column === void 0 ? void 0 : column.width) && typeof (column === null || column === void 0 ? void 0 : column.width) === 'number')
                        column.width = parseInt(column === null || column === void 0 ? void 0 : column.width);
                    const parsedText = this.parseVariables(column === null || column === void 0 ? void 0 : column.text, data);
                    const columnOptions = Object.fromEntries(Object.entries(column).filter(([key]) => !['type', 'color', 'font', 'size', 'text', 'x', 'y'].includes(key)));
                    doc.text(parsedText, xPos, (_a = column === null || column === void 0 ? void 0 : column.y) !== null && _a !== void 0 ? _a : this.top, columnOptions);
                    if (column === null || column === void 0 ? void 0 : column.width)
                        xPos += column === null || column === void 0 ? void 0 : column.width;
                    else
                        xPos += doc.widthOfString(parsedText, columnOptions);
                });
                this.top += doc._fontSize * 1.5;
                break;
            default:
                break;
        }
    }
    async createInvoice(options, order) {
        var _a, _b;
        const doc = await this.startPdf(options);
        await this.generateHeader(doc, options);
        try {
            const layoutJSON = fs_1.default.readFileSync(`${process.cwd()}/src/layouts/${(_b = (_a = options === null || options === void 0 ? void 0 : options.pdf) === null || _a === void 0 ? void 0 : _a.templates) === null || _b === void 0 ? void 0 : _b.invoice}`);
            const layout = JSON.parse(layoutJSON);
            let itemLayout = [];
            let itemLayoutRunning = false;
            Object.values(layout).forEach((layoutItem) => {
                if ((layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.type) === 'itemLoop' || (itemLayoutRunning === true && (layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.type) !== 'itemLoopEnd')) {
                    itemLayoutRunning = true;
                    itemLayout.push(layoutItem);
                }
                else if ((layoutItem === null || layoutItem === void 0 ? void 0 : layoutItem.type) === 'itemLoopEnd') {
                    itemLayoutRunning = false;
                    order.items.forEach((item, index) => {
                        this.item = index;
                        itemLayout.forEach((layoutItem) => this.generateElement(doc, layoutItem, order));
                    });
                }
                else
                    this.generateElement(doc, layoutItem, order);
            });
        }
        catch (e) {
            console.log("Invoice error: ", e);
        }
        await this.generateFooter(doc, options);
        try {
            doc.end();
            const docBuffer = await this.getStream.buffer(doc);
            return docBuffer.toString('base64');
        }
        catch (e) {
            console.log("Invoice error: ", e);
            return null;
        }
    }
    async createReturnInvoice(order, returnItems) {
        const doc = new this.PDFDocument({
            size: 'A4',
            margin: 50
        });
        const { shipping_address, billing_address } = order;
        doc
            .font('Helvetica-Bold')
            .fontSize(25)
            .text('Return Invoice', 50, 50);
        doc
            .font('Helvetica')
            .fontSize(12)
            .text(`Return ID: ${order.id}`, 50, 80);
        doc
            .font('Helvetica')
            .fontSize(12)
            .text(`Order ID: ${order.id}`, 50, 100);
        doc
            .font('Helvetica')
            .fontSize(12)
            .text(`Return Date: ${new Date().toISOString()}`, 50, 120);
        doc
            .font('Helvetica')
            .fontSize(12)
            .text(`Billing Address: ${billing_address.first_name} ${billing_address.last_name}`, 50, 140);
        doc
            .font('Helvetica')
            .fontSize(12)
            .text(`Shipping Address: ${shipping_address.first_name} ${shipping_address.last_name}`, 50, 160);
        doc
            .font('Helvetica')
            .fontSize(12)
            .text(`Email: ${order.email}`, 50, 180);
        doc
            .font('Helvetica')
            .fontSize(12)
            .text(`Phone: ${order.phone}`, 50, 200);
        doc
            .font('Helvetica')
            .fontSize(12)
            .text(`Items:`, 50, 220);
        let y = 240;
        for (const item of returnItems) {
            doc
                .font('Helvetica')
                .fontSize(12)
                .text(`${item.quantity} x ${item.title}`, 50, y);
            y += 20;
        }
        doc.end();
        const docBuffer = await this.getStream.buffer(doc);
        return docBuffer.toString('base64');
    }
}
exports.default = PdfGenerator;
