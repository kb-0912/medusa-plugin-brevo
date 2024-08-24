"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_core_utils_1 = require("medusa-core-utils");
const luxon_1 = require("luxon");
const medusa_interfaces_1 = require("medusa-interfaces");
const typeorm_1 = require("typeorm");
const Brevo = __importStar(require("@getbrevo/brevo")); // Import Brevo SDK
class BrevoService extends medusa_interfaces_1.NotificationService {
    /**
     * @param {Object} options - options defined in `medusa-config.js`
     */
    constructor({ manager, orderRepository, cartRepository, lineItemRepository, orderService, cartService, fulfillmentService, totalsService, giftCardService, }, options) {
        super({ manager, orderRepository, cartRepository, lineItemRepository });
        this.manager_ = null;
        this.orderRepository_ = null;
        this.cartRepository_ = null;
        this.lineItemRepository_ = null;
        this.options_ = options;
        this.manager_ = manager;
        this.orderRepository_ = orderRepository;
        this.cartRepository_ = cartRepository;
        this.lineItemRepository_ = lineItemRepository;
        this.orderService_ = orderService;
        this.cartService_ = cartService;
        this.fulfillmentService_ = fulfillmentService;
        this.totalsService_ = totalsService;
        this.giftCardService_ = giftCardService;
        // Initialize Brevo client
        this.client_ = new Brevo.TransactionalEmailsApi();
        this.client_.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, options.api_key);
        this.contactsClient_ = new Brevo.ContactsApi();
        this.contactsClient_.setApiKey(Brevo.ContactsApiApiKeys.apiKey, options.api_key);
    }
    async addCustomerToContactList(customer) {
        var _a, _b, _c, _d, _e;
        if (!((_a = this.options_) === null || _a === void 0 ? void 0 : _a.contact_list) || !((_c = (_b = this.options_) === null || _b === void 0 ? void 0 : _b.contact_list) === null || _c === void 0 ? void 0 : _c.enabled) || !((_e = (_d = this.options_) === null || _d === void 0 ? void 0 : _d.contact_list) === null || _e === void 0 ? void 0 : _e.contact_list_id)) {
            return;
        }
        const contactData = {
            email: customer.email,
            attributes: {
                FNAME: customer.first_name,
                LNAME: customer.last_name,
            },
            listIds: [this.options_.contact_list.contact_list_id], // Ensure this is an array
        };
        try {
            const response = await this.contactsClient_.createContact(contactData);
            return response;
        }
        catch (error) {
            console.error("Error adding customer to Brevo contact list:", error);
            throw error;
        }
    }
    async sendEmail(sendOptions) {
        const emailData = {
            sender: {
                email: this.options_.from_email,
                name: this.options_.from_name // Assuming this is set in your options
            },
            to: sendOptions.to,
            templateId: sendOptions.templateId,
            params: sendOptions.params,
        };
        try {
            const response = await this.client_.sendTransacEmail(emailData);
            return response;
        }
        catch (error) {
            console.error("Error sending email with Brevo:", error);
            throw error;
        }
    }
    async getAbandonedCarts() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        if (!((_a = this.options_) === null || _a === void 0 ? void 0 : _a.abandoned_cart) || !((_c = (_b = this.options_) === null || _b === void 0 ? void 0 : _b.abandoned_cart) === null || _c === void 0 ? void 0 : _c.enabled) || !((_e = (_d = this.options_) === null || _d === void 0 ? void 0 : _d.abandoned_cart) === null || _e === void 0 ? void 0 : _e.first)) {
            return;
        }
        console.log("Getting abandoned carts");
        const options = (_f = this.options_) === null || _f === void 0 ? void 0 : _f.abandoned_cart;
        const now = new Date();
        const firstCheck = new Date(now.getTime() - parseInt((_g = options === null || options === void 0 ? void 0 : options.first) === null || _g === void 0 ? void 0 : _g.delay) * 60 * 60 * 1000);
        const secondCheck = new Date(now.getTime() - parseInt((_h = options === null || options === void 0 ? void 0 : options.second) === null || _h === void 0 ? void 0 : _h.delay) * 60 * 60 * 1000);
        const thirdCheck = new Date(now.getTime() - parseInt((_j = options === null || options === void 0 ? void 0 : options.third) === null || _j === void 0 ? void 0 : _j.delay) * 60 * 60 * 1000);
        const cartRepository = this.manager_.withRepository(this.cartRepository_);
        const lineItemRepository = this.manager_.withRepository(this.lineItemRepository_);
        const carts = await cartRepository.findBy({
            email: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
        });
        console.log("Checking carts");
        let abandonedCarts = [];
        for (const cart of carts) {
            let orderCheck = false;
            try {
                orderCheck = await this.orderService_.retrieveByCartId(cart.id);
            }
            catch (e) {
                orderCheck = false;
            }
            const cartData = await this.cartService_.retrieve(cart.id, { relations: ["items", "shipping_address", "region"] });
            if (orderCheck)
                continue;
            if (cartData.items.find((li) => (li === null || li === void 0 ? void 0 : li.updated_at) <= firstCheck) !== undefined && ((_k = cart === null || cart === void 0 ? void 0 : cart.metadata) === null || _k === void 0 ? void 0 : _k.third_abandonedcart_mail) !== true) {
                abandonedCarts.push(cartData);
            }
        }
        if (abandonedCarts.length === 0)
            return;
        for (const cart of abandonedCarts) {
            const check = cart.items.sort((a, b) => {
                return b.updated_at.getTime() - a.updated_at.getTime();
            })[0].updated_at;
            const items = this.processItems_(cart.items, ((_l = cart === null || cart === void 0 ? void 0 : cart.region) === null || _l === void 0 ? void 0 : _l.includes_tax) ? 0 : (((_m = cart === null || cart === void 0 ? void 0 : cart.region) === null || _m === void 0 ? void 0 : _m.tax_rate) / 100), (_o = cart === null || cart === void 0 ? void 0 : cart.region) === null || _o === void 0 ? void 0 : _o.currency_code.toUpperCase());
            const sendOptions = {
                sender: {
                    email: this.options_.from_email,
                    name: this.options_.from_name
                }, // Wrap 'From' in a 'sender' object with 'email'
                to: [{ email: cart.email }], // 'to' should be an array of objects with 'email'
                templateId: 0, // Assuming '0' is a placeholder for the actual template ID
                params: {
                    ...cart,
                    items,
                    ...this.options_.default_data
                }
            };
            if (check < secondCheck) {
                if (check < thirdCheck) {
                    if (((_p = options === null || options === void 0 ? void 0 : options.third) === null || _p === void 0 ? void 0 : _p.template) && ((_q = cart === null || cart === void 0 ? void 0 : cart.metadata) === null || _q === void 0 ? void 0 : _q.third_abandonedcart_mail) !== true) {
                        sendOptions.TemplateId = (_r = options === null || options === void 0 ? void 0 : options.third) === null || _r === void 0 ? void 0 : _r.template;
                        await this.sendEmail(sendOptions)
                            .then(async () => {
                            await cartRepository.update(cart.id, {
                                metadata: {
                                    ...cart.metadata || {},
                                    third_abandonedcart_mail: true
                                }
                            });
                        })
                            .catch((error) => {
                            console.error(error);
                            return { to: sendOptions.to, status: 'failed', data: sendOptions };
                        });
                    }
                }
                else {
                    if (((_s = options === null || options === void 0 ? void 0 : options.second) === null || _s === void 0 ? void 0 : _s.template) && ((_t = cart === null || cart === void 0 ? void 0 : cart.metadata) === null || _t === void 0 ? void 0 : _t.second_abandonedcart_mail) !== true) {
                        sendOptions.TemplateId = (_u = options === null || options === void 0 ? void 0 : options.second) === null || _u === void 0 ? void 0 : _u.template;
                        await this.sendEmail(sendOptions)
                            .then(async () => {
                            await cartRepository.update(cart.id, {
                                metadata: {
                                    ...cart.metadata || {},
                                    second_abandonedcart_mail: true
                                }
                            });
                        })
                            .catch((error) => {
                            console.error(error);
                            return { to: sendOptions.to, status: 'failed', data: sendOptions };
                        });
                    }
                }
            }
            else {
                if (((_v = options === null || options === void 0 ? void 0 : options.first) === null || _v === void 0 ? void 0 : _v.template) && ((_w = cart === null || cart === void 0 ? void 0 : cart.metadata) === null || _w === void 0 ? void 0 : _w.first_abandonedcart_mail) !== true) {
                    sendOptions.TemplateId = (_x = options === null || options === void 0 ? void 0 : options.first) === null || _x === void 0 ? void 0 : _x.template;
                    await this.sendEmail(sendOptions)
                        .then(async () => {
                        await cartRepository.update(cart.id, {
                            metadata: {
                                ...cart.metadata || {},
                                first_abandonedcart_mail: true
                            }
                        });
                    })
                        .catch((error) => {
                        console.error(error);
                        return { to: sendOptions.to, status: 'failed', data: sendOptions };
                    });
                }
            }
        }
    }
    async remindUpsellOrders() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!((_a = this.options_) === null || _a === void 0 ? void 0 : _a.upsell) || !((_c = (_b = this.options_) === null || _b === void 0 ? void 0 : _b.upsell) === null || _c === void 0 ? void 0 : _c.enabled) || !((_e = (_d = this.options_) === null || _d === void 0 ? void 0 : _d.upsell) === null || _e === void 0 ? void 0 : _e.collection) || !((_g = (_f = this.options_) === null || _f === void 0 ? void 0 : _f.upsell) === null || _g === void 0 ? void 0 : _g.delay) || !((_j = (_h = this.options_) === null || _h === void 0 ? void 0 : _h.upsell) === null || _j === void 0 ? void 0 : _j.template)) {
            return [];
        }
        const orderRepo = this.manager_.withRepository(this.orderRepository_);
        const options = this.options_.upsell;
        const validThrough = luxon_1.DateTime.now().minus({ days: options.valid }).toLocaleString(luxon_1.DateTime.DATE_FULL);
        const orders = await orderRepo.findBy({
            created_at: (0, typeorm_1.LessThan)(new Date(new Date().getTime() - parseInt(options.delay) * 60 * 60 * 24 * 1000)),
        });
        for (const order of orders) {
            if (((_k = order.metadata) === null || _k === void 0 ? void 0 : _k.upsell_sent) || order.created_at < new Date(new Date().getTime() - parseInt(options.delay) * 60 * 60 * 24 * 1000))
                continue;
            const orderData = await this.orderService_.retrieve(order.id, {
                select: ["id"],
                relations: [
                    "customer", "items", "items.variant", "items.variant.product"
                ],
            });
            let upsell = true;
            for (const item of orderData.items) {
                if (((_m = (_l = item === null || item === void 0 ? void 0 : item.variant) === null || _l === void 0 ? void 0 : _l.product) === null || _m === void 0 ? void 0 : _m.collection_id) !== options.collection)
                    upsell = false;
            }
            if (upsell) {
                if (options.template.includes(",")) {
                    options.template = options.template.split(",");
                    options.template = options.template[Math.floor(Math.random() * options.template.length)];
                }
                const sendOptions = {
                    sender: {
                        email: this.options_.from_email,
                        name: this.options_.from_name
                    }, // Corrected: Wrap 'From' in 'sender' object
                    to: [{ email: orderData.customer.email }], // Corrected: 'to' should be an array of objects
                    templateId: options.template, // Ensure this is the correct template ID
                    params: {
                        ...orderData,
                        ...this.options_.default_data,
                        valid_through: validThrough
                    }
                };
                // Update order metadata
                order.metadata = {
                    ...order.metadata,
                    upsell_sent: true
                };
                await this.sendEmail(sendOptions)
                    .then(async () => {
                    await this.orderService_.update(order.id, { metadata: order.metadata });
                })
                    .catch((error) => {
                    console.error(error);
                    return { to: sendOptions.to, status: 'failed', data: sendOptions };
                });
            }
        }
    }
    async fetchAttachments(event, data, attachmentGenerator) {
        var _a, _b, _c;
        let attachments = [];
        switch (event) {
            case "user.password_reset": {
                try {
                    if (attachmentGenerator && attachmentGenerator.createPasswordReset) {
                        const base64 = await attachmentGenerator.createPasswordReset();
                        attachments.push({
                            name: "password-reset.pdf",
                            base64,
                            type: "application/pdf",
                        });
                    }
                }
                catch (err) {
                    console.error(err);
                }
                return attachments;
            }
            case "swap.created":
            case "order.return_requested": {
                try {
                    const { shipping_method, shipping_data } = data.return_request;
                    if (shipping_method) {
                        const provider = shipping_method.shipping_option.provider_id;
                        const lbl = await this.fulfillmentProviderService_.retrieveDocuments(provider, shipping_data, "label");
                        attachments = attachments.concat(lbl.map((d) => ({
                            name: "return-label.pdf",
                            base64: d.base_64,
                            type: d.type,
                        })));
                    }
                }
                catch (err) {
                    console.error(err);
                }
                try {
                    if (attachmentGenerator && attachmentGenerator.createReturnInvoice) {
                        const base64 = await attachmentGenerator.createReturnInvoice(data.order, data.return_request.items);
                        attachments.push({
                            name: "invoice.pdf",
                            base64,
                            type: "application/pdf",
                        });
                    }
                }
                catch (err) {
                    console.error(err);
                }
                return attachments;
            }
            case "order.placed": {
                try {
                    if (((_c = (_b = (_a = this.options_) === null || _a === void 0 ? void 0 : _a.pdf) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : false) && attachmentGenerator && attachmentGenerator.createInvoice) {
                        const base64 = await attachmentGenerator.createInvoice(this.options_, data);
                        attachments.push({
                            name: "invoice.pdf",
                            base64,
                            type: "application/pdf",
                        });
                    }
                }
                catch (err) {
                    console.log('error ?', err);
                    console.error(err);
                }
                return attachments;
            }
            default:
                return [];
        }
    }
    async fetchData(event, eventData, attachmentGenerator) {
        switch (event) {
            case "order.placed":
                return this.orderPlacedData(eventData, attachmentGenerator);
            case "order.shipment_created":
                console.log(this.orderShipmentCreatedData(eventData, attachmentGenerator));
                return this.orderShipmentCreatedData(eventData, attachmentGenerator);
            case "order.canceled":
                return this.orderCanceledData(eventData, attachmentGenerator);
            case "user.password_reset":
                return this.userPasswordResetData(eventData, attachmentGenerator);
            case "customer.password_reset":
                return this.customerPasswordResetData(eventData, attachmentGenerator);
            case "gift_card.created":
                return this.giftCardData(eventData, attachmentGenerator);
            default:
                return eventData;
        }
    }
    async sendNotification(event, eventData, attachmentGenerator) {
        var _a, _b, _c;
        let group = undefined;
        let action = undefined;
        try {
            const event_ = event.split(".", 2);
            group = event_[0];
            action = event_[1];
            if (typeof group === "undefined" || typeof action === "undefined" || this.options_.events[group] === undefined || this.options_.events[group][action] === undefined)
                return false;
        }
        catch (err) {
            console.error(err);
            return false;
        }
        let templateId = this.options_.events[group][action];
        const data = await this.fetchData(event, eventData, attachmentGenerator);
        const attachments = await this.fetchAttachments(event, data, attachmentGenerator);
        if (data.locale && typeof templateId === "object")
            templateId = templateId[data.locale] || Object.values(templateId)[0]; // Fallback to first template if locale is not found
        if (templateId === null)
            return false;
        const sendOptions = {
            sender: {
                email: this.options_.from_email,
                name: this.options_.from_name
            }, // Correct structure for sender
            to: [{ email: (_a = data.email) !== null && _a !== void 0 ? _a : (_b = data === null || data === void 0 ? void 0 : data.customer) === null || _b === void 0 ? void 0 : _b.email }], // Correct structure for recipient
            templateId: templateId,
            params: {
                ...data,
                ...this.options_.default_data
            }
        };
        if ((_c = this.options_) === null || _c === void 0 ? void 0 : _c.bcc)
            sendOptions.Bcc = this.options_.bcc;
        if (attachments === null || attachments === void 0 ? void 0 : attachments.length) {
            sendOptions.Attachments = attachments.map((a) => {
                return {
                    content: a.base64,
                    Name: a.name,
                    ContentType: a.type,
                    ContentID: `cid:${a.name}`,
                };
            });
        }
        return await this.client_.sendTransacEmail(sendOptions)
            .then(() => ({ to: sendOptions.to, status: 'sent', data: sendOptions }))
            .catch((error) => {
            console.error(error);
            return { to: sendOptions.to, status: 'failed', data: sendOptions };
        });
    }
    async resendNotification(notification, config, attachmentGenerator) {
        const sendOptions = {
            ...notification.data,
            To: config.to || notification.to,
        };
        const attachs = await this.fetchAttachments(notification.event_name, notification.data.dynamic_template_data, attachmentGenerator);
        sendOptions.attachments = attachs.map((a) => {
            return {
                content: a.base64,
                filename: a.name,
                type: a.type,
                disposition: "attachment",
                contentId: a.name,
            };
        });
        return await this.client_.sendTransacEmail(sendOptions)
            .then(() => ({ to: sendOptions.To, status: 'sent', data: sendOptions }))
            .catch((error) => {
            console.error(error);
            return { to: sendOptions.To, status: 'failed', data: sendOptions };
        });
    }
    async sendMail(options) {
        try {
            this.client_.sendTransacEmail({
                ...options,
                params: {
                    ...options.TemplateModel,
                    ...this.options_.default_data
                }
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async orderShipmentCreatedData({ id, fulfillment_id }, attachmentGenerator) {
        // Fetch the full order details using the order ID
        const order = await this.orderService_.retrieve(id, {
            select: [
                "id",
                "email",
                "shipping_total",
                "discount_total",
                "tax_total",
                "refunded_total",
                "gift_card_total",
                "subtotal",
                "total",
                "refundable_amount",
                "created_at",
                "updated_at",
                "customer_id",
                "currency_code",
                "tax_rate",
                "cart_id"
            ],
            relations: [
                "customer",
                "billing_address",
                "shipping_address",
                "discounts",
                "discounts.rule",
                "shipping_methods",
                "shipping_methods.shipping_option",
                "payments",
                "fulfillments",
                "returns",
                "gift_cards",
                "gift_card_transactions",
                "region",
                "items",
                "items.variant",
                "items.variant.product"
            ],
        });
        // Fetch the shipment details using the fulfillment ID
        const shipment = await this.fulfillmentService_.retrieve(fulfillment_id, {
            relations: ["items", "tracking_links"],
        });
        const tracking_numbers = shipment.tracking_links.map(link => link.tracking_number).join(", ");
        const locale = await this.extractLocale(order);
        //console.log('Tracking Number:', tracking_numbers);
        return {
            locale,
            order,
            date: shipment.shipped_at.toLocaleString(),
            email: order.email,
            fulfillment: shipment,
            tracking_links: shipment.tracking_links,
            tracking_number: tracking_numbers,
        };
    }
    async orderCanceledData({ id }) {
        const order = await this.orderService_.retrieve(id, {
            select: [
                "shipping_total",
                "discount_total",
                "tax_total",
                "refunded_total",
                "gift_card_total",
                "subtotal",
                "total",
            ],
            relations: [
                "customer",
                "billing_address",
                "shipping_address",
                "discounts",
                "discounts.rule",
                "shipping_methods",
                "shipping_methods.shipping_option",
                "payments",
                "fulfillments",
                "returns",
                "gift_cards",
                "gift_card_transactions",
            ],
        });
        const { subtotal, tax_total, discount_total, shipping_total, gift_card_total, total, } = order;
        const taxRate = order.tax_rate / 100;
        const currencyCode = order.currency_code.toUpperCase();
        const items = this.processItems_(order.items, taxRate, currencyCode);
        let discounts = [];
        if (order.discounts) {
            discounts = order.discounts.map((discount) => {
                return {
                    is_giftcard: false,
                    code: discount.code,
                    descriptor: `${discount.rule.value}${discount.rule.type === "percentage" ? "%" : ` ${currencyCode}`}`,
                };
            });
        }
        let giftCards = [];
        if (order.gift_cards) {
            giftCards = order.gift_cards.map((gc) => {
                return {
                    is_giftcard: true,
                    code: gc.code,
                    descriptor: `${gc.value} ${currencyCode}`,
                };
            });
            discounts.concat(giftCards);
        }
        const locale = await this.extractLocale(order);
        return {
            ...order,
            locale,
            has_discounts: order.discounts.length,
            has_gift_cards: order.gift_cards.length,
            date: order.created_at.toLocaleString(),
            items,
            discounts,
            subtotal: `${this.humanPrice_(subtotal * (1 + taxRate), currencyCode)} ${currencyCode}`,
            gift_card_total: `${this.humanPrice_(gift_card_total * (1 + taxRate), currencyCode)} ${currencyCode}`,
            tax_total: `${this.humanPrice_(tax_total, currencyCode)} ${currencyCode}`,
            discount_total: `${this.humanPrice_(discount_total * (1 + taxRate), currencyCode)} ${currencyCode}`,
            shipping_total: `${this.humanPrice_(shipping_total * (1 + taxRate), currencyCode)} ${currencyCode}`,
            total: `${this.humanPrice_(total, currencyCode)} ${currencyCode}`,
        };
    }
    async giftCardData({ id }) {
        var _a;
        let data = await this.giftCardService.retrieve(id, { relations: ["order"] });
        return {
            ...data,
            email: (_a = data.order.email) !== null && _a !== void 0 ? _a : ''
        };
    }
    async orderPlacedData({ id }) {
        var _a;
        const order = await this.orderService_.retrieve(id, {
            select: [
                "shipping_total",
                "discount_total",
                "tax_total",
                "refunded_total",
                "gift_card_total",
                "subtotal",
                "total",
            ],
            relations: [
                "customer",
                "billing_address",
                "shipping_address",
                "discounts",
                "discounts.rule",
                "shipping_methods",
                "shipping_methods.shipping_option",
                "payments",
                "fulfillments",
                "returns",
                "gift_cards",
                "gift_card_transactions",
            ],
        });
        const { tax_total, shipping_total, gift_card_total, total } = order;
        const currencyCode = order.currency_code.toUpperCase();
        const items = await Promise.all(order.items.map(async (i) => {
            i.totals = await this.totalsService_.getLineItemTotals(i, order, {
                include_tax: true,
                use_tax_lines: true,
            });
            i.thumbnail = this.normalizeThumbUrl_(i.thumbnail);
            i.discounted_price = `${this.humanPrice_(i.totals.total / i.quantity, currencyCode)} ${currencyCode}`;
            i.price = `${this.humanPrice_(i.totals.original_total / i.quantity, currencyCode)} ${currencyCode}`;
            return i;
        }));
        let discounts = [];
        if (order.discounts) {
            discounts = order.discounts.map((discount) => {
                return {
                    is_giftcard: false,
                    code: discount.code,
                    descriptor: `${discount.rule.value}${discount.rule.type === "percentage" ? "%" : ` ${currencyCode}`}`,
                };
            });
        }
        let giftCards = [];
        if (order.gift_cards) {
            giftCards = order.gift_cards.map((gc) => {
                return {
                    is_giftcard: true,
                    code: gc.code,
                    descriptor: `${gc.value} ${currencyCode}`,
                };
            });
            discounts.concat(giftCards);
        }
        const locale = await this.extractLocale(order);
        // Includes taxes in discount amount
        const discountTotal = items.reduce((acc, i) => {
            return acc + i.totals.original_total - i.totals.total;
        }, 0);
        const discounted_subtotal = items.reduce((acc, i) => {
            return acc + i.totals.total;
        }, 0);
        const subtotal = items.reduce((acc, i) => {
            return acc + i.totals.original_total;
        }, 0);
        const subtotal_ex_tax = items.reduce((total, i) => {
            return total + i.totals.subtotal;
        }, 0);
        return {
            ...order,
            locale,
            has_discounts: order.discounts.length,
            has_gift_cards: order.gift_cards.length,
            date: order.created_at.toLocaleString(),
            items,
            discounts,
            subtotal_ex_tax: `${this.humanPrice_(subtotal_ex_tax, currencyCode)} ${currencyCode}`,
            subtotal: `${this.humanPrice_(subtotal, currencyCode)} ${currencyCode}`,
            gift_card_total: `${this.humanPrice_(gift_card_total, currencyCode)} ${currencyCode}`,
            tax_total: `${this.humanPrice_(tax_total, currencyCode)} ${currencyCode}`,
            discount_total: `${this.humanPrice_(discountTotal, currencyCode)} ${currencyCode}`,
            shipping_total: `${this.humanPrice_(shipping_total, currencyCode)} ${currencyCode}`,
            shipping_total_inc: `${this.humanPrice_(((_a = order === null || order === void 0 ? void 0 : order.shipping_methods[0]) === null || _a === void 0 ? void 0 : _a.price) || shipping_total, currencyCode)} ${currencyCode}`,
            total: `${this.humanPrice_(total, currencyCode)} ${currencyCode}`,
        };
    }
    userPasswordResetData(data) {
        return data;
    }
    customerPasswordResetData(data) {
        return data;
    }
    processItems_(items, taxRate, currencyCode) {
        return items.map((i) => {
            return {
                ...i,
                thumbnail: this.normalizeThumbUrl_(i.thumbnail),
                price: `${currencyCode} ${this.humanPrice_(i.unit_price * (1 + taxRate), currencyCode)}`,
            };
        });
    }
    humanPrice_(amount, currency) {
        if (!amount)
            return "0.00";
        const normalized = (0, medusa_core_utils_1.humanizeAmount)(amount, currency);
        return normalized.toFixed(medusa_core_utils_1.zeroDecimalCurrencies.includes(currency.toLowerCase()) ? 0 : 2);
    }
    normalizeThumbUrl_(url) {
        if (!url)
            return null;
        else if (url.startsWith("http"))
            return url;
        else if (url.startsWith("//"))
            return `https:${url}`;
        return url;
    }
    async extractLocale(fromOrder) {
        if (fromOrder.cart_id) {
            try {
                const cart = await this.cartService_.retrieve(fromOrder.cart_id, {
                    select: ["id", "context"],
                });
                console.log("Cart retrieved:", cart); // Log the cart data
                if (cart.context && cart.context.locale)
                    return cart.context.locale;
            }
            catch (err) {
                console.log(err);
                console.warn("Failed to gather context for order");
                return null;
            }
        }
        return null;
    }
}
BrevoService.identifier = "brevo";
exports.default = BrevoService;
