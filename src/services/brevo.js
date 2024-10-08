import { humanizeAmount, zeroDecimalCurrencies } from "medusa-core-utils";
import { DateTime } from "luxon";
import { NotificationService } from "medusa-interfaces";
import { EntityManager, IsNull, Not, LessThan } from "typeorm";
import * as Brevo from "@getbrevo/brevo";  // Import Brevo SDK

class BrevoService extends NotificationService {
  static identifier = "brevo";
  manager_ = null;
  orderRepository_ = null;
  cartRepository_ = null;
  lineItemRepository_ = null;

  /**
   * @param {Object} options - options defined in `medusa-config.js`
   */
  constructor(
    {
      manager,
      orderRepository,
      cartRepository,
      lineItemRepository,
      orderService,
      cartService,
      fulfillmentService,
      totalsService,
      giftCardService,
    },
    options
  ) {
    super({ manager, orderRepository, cartRepository, lineItemRepository });

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
    if (!this.options_?.contact_list || !this.options_?.contact_list?.enabled || !this.options_?.contact_list?.contact_list_id) {
      return;
    }
    const contactData = {
      email: customer.email,
      attributes: {
        FNAME: customer.first_name,
        LNAME: customer.last_name,
      },
      listIds: [this.options_.contact_list.contact_list_id],  // Ensure this is an array
    };

    try {

      const response = await this.contactsClient_.createContact(contactData);
      return response;
    } catch (error) {
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
      templateId: Number(sendOptions.templateId),
      params: sendOptions.params,
    };
  
    try {
      const response = await this.client_.sendTransacEmail(emailData);
      return response;
    } catch (error) {
      console.error("Error sending email with Brevo:", error);
      throw error;
    }
  }
  
  
  


  async getAbandonedCarts() {
    if (!this.options_?.abandoned_cart || !this.options_?.abandoned_cart?.enabled || !this.options_?.abandoned_cart?.first) {
      return;
    }
  
    console.log("Getting abandoned carts");
    const options = this.options_?.abandoned_cart;
    const now = new Date();
    const firstCheck = new Date(now.getTime() - parseInt(options?.first?.delay) * 60 * 60 * 1000);
    const secondCheck = new Date(now.getTime() - parseInt(options?.second?.delay) * 60 * 60 * 1000);
    const thirdCheck = new Date(now.getTime() - parseInt(options?.third?.delay) * 60 * 60 * 1000);
    const cartRepository = this.manager_.withRepository(this.cartRepository_);
    const carts = await cartRepository.findBy({
      email: Not(IsNull()),
    });
  
    console.log("Checking carts");
    let abandonedCarts = [];
    for (const cart of carts) {
      let orderCheck = false;
      try {
        orderCheck = await this.orderService_.retrieveByCartId(cart.id);
      } catch (e) {
        orderCheck = false;
      }
      const cartData = await this.cartService_.retrieve(cart.id, { relations: ["items", "shipping_address", "region"] });
      if (orderCheck) continue;
      if (cartData.items.find((li) => li?.updated_at <= firstCheck) !== undefined && cart?.metadata?.third_abandonedcart_mail !== true) {
        abandonedCarts.push(cartData);
      }
    }
    
    if (abandonedCarts.length === 0) return;
  
    for (const cart of abandonedCarts) {
      const check = cart.items.sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime())[0].updated_at;
      const items = this.processItems_(cart.items, cart?.region?.includes_tax ? 0 : (cart?.region?.tax_rate / 100), cart?.region?.currency_code.toUpperCase());
  
      // Extract locale and countryCode using your extractLocale function
      const { locale, countryCode } = await this.extractLocale(cart); 
  
      let templateId;
      const action = check < thirdCheck ? "third" : check < secondCheck ? "second" : "first";  // Determine which abandoned cart email to send
      templateId = options[action]?.template;
  
      // Check if templateId is an object (with locale or countryCode mappings) or a single ID
      if (typeof templateId === "object") {
        if (countryCode && templateId[countryCode]) {
          templateId = templateId[countryCode];
        } else if (locale && templateId[locale]) {
          templateId = templateId[locale];
        } else {
          templateId = templateId.default || Object.values(templateId)[0];  // Fallback to the default or first template
        }
      }
  
      const sendOptions = {
        sender: { email: this.options_.from_email, name: this.options_.from_name },
        to: [{ email: cart.email }],
        templateId: Number(templateId),  // Ensure the template ID is a number
        params: { ...cart, items, ...this.options_.default_data }
      };
  
      // Check which reminder stage to send
      if (check < secondCheck) {
        if (check < thirdCheck && !cart?.metadata?.third_abandonedcart_mail) {
          await this.sendEmail(sendOptions)
            .then(async () => {
              await cartRepository.update(cart.id, {
                metadata: { ...cart.metadata, third_abandonedcart_mail: true }
              });
            })
            .catch((error) => console.error(error));
        }
      } else if (check < secondCheck && !cart?.metadata?.second_abandonedcart_mail) {
        await this.sendEmail(sendOptions)
          .then(async () => {
            await cartRepository.update(cart.id, {
              metadata: { ...cart.metadata, second_abandonedcart_mail: true }
            });
          })
          .catch((error) => console.error(error));
      } else if (!cart?.metadata?.first_abandonedcart_mail) {
        await this.sendEmail(sendOptions)
          .then(async () => {
            await cartRepository.update(cart.id, {
              metadata: { ...cart.metadata, first_abandonedcart_mail: true }
            });
          })
          .catch((error) => console.error(error));
      }
    }
  }

  async remindUpsellOrders() {
    if (!this.options_?.upsell || !this.options_?.upsell?.enabled || !this.options_?.upsell?.collection || !this.options_?.upsell?.delay || !this.options_?.upsell?.template) {
      return [];
    }
    const orderRepo = this.manager_.withRepository(this.orderRepository_);
    const options = this.options_.upsell;
    const validThrough = DateTime.now().minus({ days: options.valid }).toLocaleString(DateTime.DATE_FULL);
    const orders = await orderRepo.findBy({
      created_at: LessThan(new Date(new Date().getTime() - parseInt(options.delay) * 60 * 60 * 24 * 1000)),
    });

    for (const order of orders) {
      if (order.metadata?.upsell_sent || order.created_at < new Date(new Date().getTime() - parseInt(options.delay) * 60 * 60 * 24 * 1000)) continue;
      const orderData = await this.orderService_.retrieve(order.id, {
        select: ["id"],
        relations: [
          "customer", "items", "items.variant", "items.variant.product"
        ],
      });
      let upsell = true;
      for (const item of orderData.items) {
        if (item?.variant?.product?.collection_id !== options.collection)
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
           },  // Corrected: Wrap 'From' in 'sender' object
          to: [{ email: orderData.customer.email }],  // Corrected: 'to' should be an array of objects
          templateId: options.template,  // Ensure this is the correct template ID
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
        } catch (err) {
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

            const lbl = await this.fulfillmentProviderService_.retrieveDocuments(
              provider,
              shipping_data,
              "label"
            );

            attachments = attachments.concat(
              lbl.map((d) => ({
                name: "return-label.pdf",
                base64: d.base_64,
                type: d.type,
              }))
            );
          }
        } catch (err) {
          console.error(err);
        }

        try {
          if (attachmentGenerator && attachmentGenerator.createReturnInvoice) {
            const base64 = await attachmentGenerator.createReturnInvoice(
              data.order,
              data.return_request.items
            );
            attachments.push({
              name: "invoice.pdf",
              base64,
              type: "application/pdf",
            });
          }
        } catch (err) {
          console.error(err);
        }
        return attachments;
      }
      case "order.placed": {

        try {
          if ((this.options_?.pdf?.enabled ?? false) && attachmentGenerator && attachmentGenerator.createInvoice) {
            const base64 = await attachmentGenerator.createInvoice(
              this.options_,
              data
            );
            attachments.push({
              name: "invoice.pdf",
              base64,
              type: "application/pdf",
            });
          }
        } catch (err) {

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
        //console.log('orderShipmentCreatedData log:',this.orderShipmentCreatedData(eventData, attachmentGenerator))
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
    let group = undefined;
    let action = undefined;
    try {
      const event_ = event.split(".", 2);
      group = event_[0];
      action = event_[1];
      if (typeof group === "undefined" || typeof action === "undefined" || this.options_.events[group] === undefined || this.options_.events[group][action] === undefined)
        return false;
    } catch (err) {
      console.error(err);
      return false;
    }

    const data = await this.fetchData(event, eventData, attachmentGenerator);
    //console.log('Data', data)
    const attachments = await this.fetchAttachments(
      event,
      data,
      attachmentGenerator
    );

    let templateId = this.options_.events[group][action];

    if (typeof templateId === "object") {
      // Prioritize countryCode over locale
      if (data.locale?.countryCode && templateId[data.locale.countryCode]) {
        templateId = templateId[data.locale.countryCode];
      } else if (data.locale?.locale && templateId[data.locale.locale]) {
        templateId = templateId[data.locale.locale];
      } else {
        templateId = Object.values(templateId)[0]; // Fallback to the first template if no match
      }
    }
       
  
    if (templateId === null)
      return false;

    const sendOptions = {
      sender: { 
        email: this.options_.from_email,
        name: this.options_.from_name
       },  // Correct structure for sender
      to: [{ email: data.email ?? data?.customer?.email }],  // Correct structure for recipient
      templateId: Number(templateId),
      params: {
        ...data,
        ...this.options_.default_data
      }
    };
    //console.log('sendOptions', sendOptions)
    if (this.options_?.bcc)
      sendOptions.Bcc = this.options_.bcc;

    if (attachments?.length) {
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

    const attachs = await this.fetchAttachments(
      notification.event_name,
      notification.data.dynamic_template_data,
      attachmentGenerator
    );
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
    } catch (err) {
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
    
    const locale = await this.extractLocale(order)

   
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

    const {
      subtotal,
      tax_total,
      discount_total,
      shipping_total,
      gift_card_total,
      total,
    } = order;

    const taxRate = order.tax_rate / 100;
    const currencyCode = order.currency_code.toUpperCase();

    const items = this.processItems_(order.items, taxRate, currencyCode);

    let discounts = [];
    if (order.discounts) {
      discounts = order.discounts.map((discount) => {
        return {
          is_giftcard: false,
          code: discount.code,
          descriptor: `${discount.rule.value}${
            discount.rule.type === "percentage" ? "%" : ` ${currencyCode}`
          }`,
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
      subtotal: `${this.humanPrice_(
        subtotal * (1 + taxRate),
        currencyCode
      )} ${currencyCode}`,
      gift_card_total: `${this.humanPrice_(
        gift_card_total * (1 + taxRate),
        currencyCode
      )} ${currencyCode}`,
      tax_total: `${this.humanPrice_(tax_total, currencyCode)} ${currencyCode}`,
      discount_total: `${this.humanPrice_(
        discount_total * (1 + taxRate),
        currencyCode
      )} ${currencyCode}`,
      shipping_total: `${this.humanPrice_(
        shipping_total * (1 + taxRate),
        currencyCode
      )} ${currencyCode}`,
      total: `${this.humanPrice_(total, currencyCode)} ${currencyCode}`,
    };
  }

  async giftCardData({ id }) {
    let data = await this.giftCardService.retrieve(
      id, { relations: ["order"] }
    );
    return {
      ...data,
      email: data.order.email ?? ''
    };
  }
  async orderPlacedData({ id }) {
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

    const items = await Promise.all(
      order.items.map(async (i) => {
        i.totals = await this.totalsService_.getLineItemTotals(i, order, {
          include_tax: true,
          use_tax_lines: true,
        });
        i.thumbnail = this.normalizeThumbUrl_(i.thumbnail);
        i.discounted_price = `${this.humanPrice_(
          i.totals.total / i.quantity,
          currencyCode
        )} ${currencyCode}`;
        i.price = `${this.humanPrice_(
          i.totals.original_total / i.quantity,
          currencyCode
        )} ${currencyCode}`;
        return i;
      })
    );

    let discounts = [];
    if (order.discounts) {
      discounts = order.discounts.map((discount) => {
        return {
          is_giftcard: false,
          code: discount.code,
          descriptor: `${discount.rule.value}${
            discount.rule.type === "percentage" ? "%" : ` ${currencyCode}`
          }`,
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


    //console.log(`TOTAL ${this.humanPrice_(total, currencyCode)} ${currencyCode}`,)
    return {
      ...order,
      locale,
      has_discounts: order.discounts.length,
      has_gift_cards: order.gift_cards.length,
      date: order.created_at.toLocaleString(),
      items,
      discounts,
      subtotal_ex_tax: `${this.humanPrice_(
        subtotal_ex_tax,
        currencyCode
      )} ${currencyCode}`,
      subtotal: `${this.humanPrice_(subtotal, currencyCode)} ${currencyCode}`,
      gift_card_total: `${this.humanPrice_(
        gift_card_total,
        currencyCode
      )} ${currencyCode}`,
      tax_total: `${this.humanPrice_(tax_total, currencyCode)} ${currencyCode}`,
      discount_total: `${this.humanPrice_(
        discountTotal,
        currencyCode
      )} ${currencyCode}`,
      shipping_total: `${this.humanPrice_(
        shipping_total,
        currencyCode
      )} ${currencyCode}`,
      shipping_total_inc: `${this.humanPrice_(
        order?.shipping_methods[0]?.price || shipping_total,
        currencyCode
      )} ${currencyCode}`,
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
        price: `${currencyCode} ${this.humanPrice_(
          i.unit_price * (1 + taxRate),
          currencyCode
        )}`,
      };
    });
  }

  humanPrice_(amount, currencyCode) {
    if (!amount)
      return "0.00";
    const normalizedAmount = humanizeAmount(amount, currencyCode);

    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      // Remove decimals for all currencies
      minimumFractionDigits: 0,
     
    });

    return formatter.format(normalizedAmount);
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

  async OLDextractLocale(fromOrder) {
    if (fromOrder.cart_id) {
      try {
        const cart = await this.cartService_.retrieve(fromOrder.cart_id, {
          select: ["id", "context"],
        });
        //console.log("Cart retrieved:", cart); // Log the cart data
        if (cart.context && cart.context.locale)
          return cart.context.locale;
      } catch (err) {
        console.log(err);
        console.warn("Failed to gather context for order");
        return null;
      }
    }
    return null;
  }

  async extractLocale(fromOrder) {
    if (fromOrder.cart_id) {
      try {
        const cart = await this.cartService_.retrieve(fromOrder.cart_id, {
          select: ["id", "context"],
        });
  
        // Extract locale and countryCode from cart context
        const { locale, countryCode } = cart.context || {};
  
        if (locale || countryCode) {
          return { locale, countryCode };
        }
      } catch (err) {
        console.log(err);
        console.warn("Failed to gather context for order");
        return { locale: null, countryCode: null };
      }
    }
    return { locale: null, countryCode: null };
  }
  
}

export default BrevoService;
