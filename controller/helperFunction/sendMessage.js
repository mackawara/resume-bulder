import axios from "axios";
import dotenv from "dotenv"
dotenv.config()
const token = process.env.WHATSAPP_TOKEN;
const cloudApiVersion = process.env.CLOUD_API_VERSION
const phoneID = process.env.WA_PHONE_NUMBER_ID
const headers = { "Content-Type": "application/json" }

const messagesEndpointUrl = `https://graph.facebook.com/${cloudApiVersion}/${phoneID}/messages?access_token=${token}`
const freeFormText = async (receivingNumber, templateName) => {
    axios({
        method: "POST",
        url: messagesEndpointUrl,
        data: {
            //recipient_type: "individual",
            messaging_product: "whatsapp",
            to: receivingNumber,
            type: "template",
            template: { "name": templateName, "language": { "code": "en_US" } },
            headers: { "Content-Type": "application/json" }
        }
    })
        .then((data) => {
            console.log("message sent successfuly");
            console.log(data.data);
        })
        .catch((err) => {
            console.log(err.response.data.error.error_data);
        });
};
const product = async (receivingNumber, catalogId, product) => {
    //console.log(phone, token,)
    axios({
        method: "POST",
        url: messagesEndpointUrl,
        data: {
            //recipient_type: "individual",
            messaging_product: "whatsapp",
            to: receivingNumber,
            //   type: "template",
            //  template: { "name": "hello_world", "language": { "code": "en_US" } }, 
            type: "interactive",
            interactive: {
                type: "product",
                body: { text: product.body },
                footer: { text: product.footer },
                action: {
                    catalog_id: catalogId,//"2309414272779596",
                    product_retailer_id: product.productId//"functional01"
                }
            },
            headers: { "Content-Type": "application/json" }
        }
    })
        .then((data) => {
            console.log("message sent successfuly");
            console.log(data.data);
        })
        .catch((err) => {
            console.log("ann error occured")
            console.log(err.response.data.error);
        });
};
const addressTemplate = async (receivingNumber, catalogId, product) => {
    //console.log(phone, token,)
    axios({
        method: "POST",
        url: messagesEndpointUrl,
        data: {
            messaging_product: "whatsapp",
            to: receivingNumber,
            type: "interactive",
            interactive: {
                type: "address_message",
                body: {
                    "text": "Thanks for your order! Tell us what address you’d like this order delivered to."
                },
                //footer: { text: product.footer },
                action: {
                    "name": "address_message",
                    "parameters": {
                        "country": "COUNTRY_ISO_CODE"
                    }
                }
            },
            headers: { "Content-Type": "application/json" }
        }
    })
        .then((data) => {
            console.log("message sent successfuly");
            console.log(data.data);
        })
        .catch((err) => {
            console.log("ann error occured")
            console.log(err.response.data.error);
        });
};
const multiProduct = async (receivingNumber, catalogId,) => {
    //console.log(phone, token,)
    axios({
        method: "POST",
        url: messagesEndpointUrl,
        data: {
            //recipient_type: "individual",
            messaging_product: "whatsapp",
            to: receivingNumber,
            //   type: "template",
            //  template: { "name": "hello_world", "language": { "code": "en_US" } }, 
            type: "interactive",
            interactive: {
                type: "product_list",
                header: { type: "text", text: "Resume Builder", },
                body: { text: "Resume Builder Catalog" },
                footer: { text: "Choose 1" },
                action: {
                    catalog_id: catalogId,
                    sections: [
                        {
                            title: "Resume options",
                            product_items: [
                                { product_retailer_id: "11190" },
                               /*  { product_retailer_id: "5236" },
                                { product_retailer_id: "5210" },
                                { product_retailer_id: "11190" },
                                { product_retailer_id: "6816" },
                                { product_retailer_id: "6942" },
                                { product_retailer_id: "10327" },
                                { product_retailer_id: "5183" },
                                { product_retailer_id: "6494" }, */
                            ]
                        },
                      /*   {
                            title: "Resume 2",
                            product_items: [
                                { product_retailer_id: "chrono2" },]
                        } */,]
                },
            },
            headers: { "Content-Type": "application/json" }
        }
    })
        .then((data) => {
            console.log("message sent successfuly");
            console.log(data.data);
        })
        .catch((err) => {
            console.log("ann error occured")
            console.log(err.response.data.error);
        });
};
const button = async (receivingNumber) => {
    //console.log(phone, token,)
    axios({
        method: "POST",
        url: messagesEndpointUrl,
        data: {
            //recipient_type: "individual",
            messaging_product: "whatsapp",
            to: receivingNumber,
            type: "interactive",
            interactive: {
                type: "button",
                header: { type: "text", text: "City", },
                body: { text: "Please select your city below" },
                // footer: { text: "Choose 1" },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "City",
                                "title": "Hwange"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "City",
                                "title": "Durban"
                            }
                        }
                    ]
                }
            },
            headers: { "Content-Type": "application/json" }
        }
    })
        .then((data) => {
            console.log("message sent successfuly");
            console.log(data.data);
        })
        .catch((err) => {
            console.log("ann error occured")
            console.log(err.response);
        });
};
const listMessage = async (receivingNumber) => {
    axios({
        method: "POST",
        url: messagesEndpointUrl,
        data: {
            //recipient_type: "individual",
            messaging_product: "whatsapp",
            to: receivingNumber,
            type: "interactive",
            interactive: {
                "type": "list",
                "header": {
                    "type": "text",
                    "text": "Welcome to Farmers Club"
                },
                "body": {
                    "text": "Please click to open the menu below"
                },
               
                "action": {
                    "button": "Farmers Club Menu",
                    "sections": [
                        {
                            "title": "Shop",
                            "rows": [
                                {
                                    "id": "request_catalog ",
                                    "title": "Request catalog",
                                    "description": "I want to see a list of Farmers Club product offerings"
                                },
                                {
                                    "id": "place_order",
                                    "title": "Place order",
                                    "description": "I want to place an order"
                                },
                                {
                                    "id": "track_order",
                                    "title": "Track Orders",
                                    "description": "I want to track my most recent order"
                                }
                            ]
                        },
                        {
                            "title": "Enquiries",
                            "rows": [
                                {
                                    "id": "how_does-it_work",
                                    "title": "How does it work",
                                    "description": "I want to find out how Farmers Club works?"
                                },
                                {
                                    "id": "specific_question",
                                    "title": "Specific Question",
                                    "description": "I have a specific question I want to ask"
                                }
                            ]
                        },{
                            "title": "Review",
                            "rows": [
                                {
                                    "id": "product_review",
                                    "title": "Product Review",
                                    "description": "I have a review for a specific product?"
                                },
                               
                            ]
                        }
                    ]
                }
            }
        }
    }).then((data) => {
        console.log("message sent successfuly");
        console.log(data.data);
    })
        .catch((err) => {
            console.log("ann error occured")
            console.log(err.response.data.error);
        });
}
const catalogMessage = async (receivingNumber, productId) => {
    axios({
        method: "POST",
        url: messagesEndpointUrl,
        data: {
            //recipient_type: "individual",
            messaging_product: "whatsapp",
            to: receivingNumber,
            "recipient_type": "individual",
            //   type: "template",
            //  template: { "name": "hello_world", "language": { "code": "en_US" } }, 
            type: "interactive",
            interactive: {
                type: "catalog_message",
                "body": {
                    "text": "Thanks for your order! Tell us what address you’d like this order delivered to."
                },
                "action": {
                    "name": "catalog_message",
                    "parameters": { // *Optional
                        "thumbnail_product_retailer_id": "chrono1"
                    }
                }
            },
            headers: { "Content-Type": "application/json" }
        }
    })
        .then((data) => {
            console.log("message sent successfuly");
            console.log(data.data);
        })
        .catch((err) => {
            console.log("ann error occured")
            console.log(err.response.data.error);
        });
}
const requestLocation = async (receivingNumber,) => {
    //console.log(phone, token,)
    axios({
        method: "POST",
        url: messagesEndpointUrl,
        data: {
            //recipient_type: "individual",
            messaging_product: "whatsapp",
            to: receivingNumber,
            type: "interactive",
            interactive: {
                "type": "location_request_message",
                "body": {
                    "type": "text",
                    "text": "To place your order please send your location by tapping "
                },
                "action": {
                    "name": "send_location"
                }
            }
        },
    })
}

export default { sendTextMessage: freeFormText, sendInteractive: product, sendMultiProduct: multiProduct, sendButton: button, requestLocation, catalogMessage, listMessage }