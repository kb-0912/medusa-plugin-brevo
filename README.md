# medusa-plugin-brevo-email

Notifications plugin for Medusa ecommerce server that sends transactional emails via [Brevo](https://brevo.com/).

## Features

- Uses the email templating features built into BREVO
- The plugin is in active development. If you have any feature requests, please open an issue.
- Create PDF invoices and credit notes and attach them to the email
- Send out upsell emails to customers that have recently placed an order with certain collections
- Send out automated abandoned cart emails to customers that have abandoned their cart (based on last updated date of cart)

## Configuration

Enable in your medusa-config.js file similar to other plugins:  

###### More events? (work in progress within the plugin!) [See here](https://docs.medusajs.com/advanced/backend/subscribers/events-list)

```js
const plugins = [
    // ... other plugins
    {
        resolve: `medusa-plugin-brevo-email`,
        options: {
            api_key: process.env.BREVO_API_KEY,
            from_email: process.env.BREVO_FROM_EMAIL,
            from_name: process.env.BREVO_FROM_NAME,
            bcc: process.env.BREVO_BCC || null,
            pdf: {
                enabled: process.env.BREVO_PDF_ENABLED || false,
                settings: {
                    font: process.env.BREVO_PDF_FONT || 'Helvetica', 
                    // [{file: 'yourfont.ttf', name: 'yourfont'},{file: 'yourfont-bold.ttf', name: 'yourfontbold'}]
                    format: process.env.BREVO_PDF_FORMAT || 'A4', 
                    // see supported formats here: https://pdfkit.org/docs/paper_sizes.html
                    margin: {
                        top: process.env.BREVO_PDF_MARGIN_TOP || '50',
                        right: process.env.BREVO_PDF_MARGIN_RIGHT || '50',
                        bottom: process.env.BREVO_PDF_MARGIN_BOTTOM || '50',
                        left: process.env.BREVO_PDF_MARGIN_LEFT || '50'
                    },
                    empty: "" // what to show if variable can't be found. Defaults to __UNDEFINED__
                },
                header: {
                    enabled: process.env.BREVO_PDF_HEADER_ENABLED || false,
                    content: process.env.BREVO_PDF_HEADER_CONTENT || null,
                    // loads empty header if null, otherwise loads the file from `BREVO_PDF_HEADER_CONTENT`
                    height: process.env.BREVO_PDF_HEADER_HEIGHT || '50'
                },
                footer: {
                    enabled: process.env.BREVO_PDF_FOOTER_ENABLED || false,
                    content: process.env.BREVO_PDF_FOOTER_CONTENT || null,
                    // loads empty footer if null, otherwise loads the file from `BREVO_PDF_FOOTER_CONTENT`
                },
                templates: {
                    invoice: process.env.BREVO_PDF_INVOICE_TEMPLATE || null,
                    credit_note: process.env.BREVO_PDF_CREDIT_NOTE_TEMPLATE || null,
                    return_invoice: process.env.BREVO_PDF_RETURN_INVOICE_TEMPLATE || null
                }
            },
            events: {
                order: {
                    placed: process.env.BREVO_ORDER_PLACED || null,
                    canceled: process.env.BREVO_ORDER_CANCELED || null,
                    shipment_created: process.env.BREVO_ORDER_SHIPMENT_CREATED || null,
                },
                customer: {
                    created: process.env.BREVO_CUSTOMER_CREATED || null,
                    password_reset: process.env.BREVO_CUSTOMER_PASSWORD_RESET || null,
                },
                user: {
                    created: process.env.BREVO_USER_CREATED || null,
                    password_reset: process.env.BREVO_USER_PASSWORD_RESET || null,
                },
                auth: {
                    password_reset: process.env.BREVO_AUTH_PASSWORD_RESET || null,
                    verify_account: process.env.BREVO_AUTH_VERIFY_ACCOUNT || null,
                },
                activity: {
                    inactive_user: process.env.BREVO_ACTIVITY_INACTIVE_USER || null,
                    inactive_customer: process.env.BREVO_ACTIVITY_INACTIVE_CUSTOMER || null,
                }
            },
            upsell: {
                enabled: process.env.BREVO_UPSELL_ENABLED || false,
                template: process.env.BREVO_UPSELL_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
                delay: process.env.BREVO_UPSELL_DELAY || 9, // delay in days
                valid: process.env.BREVO_UPSELL_VALID || 30, // valid in days
                collection: process.env.BREVO_UPSELL_COLLECTION || null,
            },
            abandoned_cart: {
                enabled: process.env.BREVO_ABANDONED_CART_ENABLED || false,
                first: {
                    delay: process.env.BREVO_ABANDONED_CART_FIRST_DELAY || 1, // delay in hours
                    template: process.env.BREVO_ABANDONED_CART_FIRST_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
                },
                second: {
                    delay: process.env.BREVO_ABANDONED_CART_SECOND_DELAY || 24, // delay in hours
                    template: process.env.BREVO_ABANDONED_CART_SECOND_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
                },
                third: {
                    delay: process.env.BREVO_ABANDONED_CART_THIRD_DELAY || 48, // delay in hours
                    template: process.env.BREVO_ABANDONED_CART_THIRD_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
                },
            },
            default_data: {
                // ... default data to be passed to the email template
                product_url: process.env.BREVO_PRODUCT_URL || '',
                product_name: process.env.BREVO_PRODUCT_NAME || '',
                company_name: process.env.BREVO_COMPANY_NAME || '',
                company_address: process.env.BREVO_COMPANY_ADDRESS || '',
            }
        }
    }
]
```

### Templates

The plugin uses the BREVO template system for emails. For attachments the plugin relies on the [pdfkit](https://pdfkit.org/) library.  
In your JSON templates you can use several types (and [variables](#variables)):
- `image` for (**local**) images
- `text` for simple words, (long) sentences, paragraphs and links
- `moveDown` for moving the cursor down one line
- `hr` for a horizontal line
- `tableRow` for a table(-like) row
- `itemLoop` for looping over items in an order
- `itemLoopEnd` for ending the item loop

**Example:**
```json
[
  {
    "type": "image",
    "image": "image.png",
    "x": 100,
    "y": 100,
    "fit": [200, 50]
  },
  {
    "type": "text",
    "text": "This is a text",
    "size": 20
  },
  {
    "type": "moveDown",
    "lines": 2
  },
  {
    "type": "hr"
  },
  {
    "type": "moveDown",
    "lines": 2
  },
  {
    "type": "text",
    "text": "Another text"
  }
]
```

#### image

Images are stored in `/src/images/` and can be used in the template like this:
```json
{
    "type": "image",
    "image": "image.png",
    "x": 100,
    "y": 100,
    "fit": [200, 50]
}
```
`fit` has multiple options, see [here](https://pdfkit.org/docs/images.html#fitting-images-to-a-frame) for more info.  

##### Optional: 
- `align` horizontally align the image, the possible values are `left`, `center`, or `right`
- `valign` vertically align the image, the possible values are `top`, `center`, or `bottom`

#### text

Text can be used for words, sentences, paragraphs and links.  
```json
{
    "type": "text",
    "text": "This is a text"
}
```
If you use [`moveDown`](#movedown) correct you won't need to use `x` and `y` for the text.
##### Optional:
These options can be used to style the text or to position it.
- `x` the x position of the text
- `y` the y position of the text
- `font` the font of the text
- `size` the font size of the text
- `color` the color of the text (Hex codes `#ff0000`)
- `width` the width of the text
- `align` the alignment of the text, the possible values are `left`, `center`, `right`, or `justify`.  

For more styling options, see [here](https://pdfkit.org/docs/text.html#text_styling) for more info.

#### moveDown

This is used to move the cursor down one or more line(s).  
```json
{
    "type": "moveDown",
    "lines": 1
}
```

#### hr

This is used to draw a horizontal line.  
```json
{
    "type": "hr"
}
```

##### Optional:
- `color` the color of the line (Hex codes `#ff0000`)
- `width` the width of the line if you don't want it to be the full width of the page
- `height` the height of the line element, including padding
- `y` the y position of the line if you can not rely on the cursor (affected by [`moveDown`](#movedown))

#### tableRow

This is used to draw a table row.  
```json
{
    "type": "tableRow",
    "columns": [
        {
            "text": "Column 1",
            "width": 200
        },
        {
            "text": "Column 2",
            "width": 150
        }
    ]
}
```
##### Optional:
You can use the same options as for `text` to style the text in the table row. If you want a special column styled, you can add the options to the column object.

```

## Acknowledgement

This plugin is originally based on medusa-plugin-postmark by Fullstack-nl.
