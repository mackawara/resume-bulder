"use strict";

// Access token for your app
// (copy token from DevX getting started page


import express from "express"
import axios from "axios"
import bodyparser from "body-parser"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT || 1337; // creates express http server
const app = express()
//Endpints 
const token = process.env.WHATSAPP_TOKEN;
const waBizID = process.env.WHATSAPP_BIZ_ID;
const cloudApiVersion=process.env.CLOUD_API_VERSION


const phoneID=process.env.WA_PHONE_NUMBER_ID
const recipient_number = "263775231426"


const send = async () => {
    //console.log(phone, token,)
    axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url:
            `https://graph.facebook.com/${cloudApiVersion}/ 
            ${phoneId} 
            "/messages?access_token=${token}`,
        data: {
            //recipient_type: "individual",
            messaging_product: "whatsapp",
            to: "263775231426",
            type: "template",
            template: { "name": "hello_world", "language": { "code": "en_US" } },
            /* type: "interactive",
            interactive: {
                type: "product",
                body: {
                    text: "Test Body"
                },
                footer: {
                    text: "test footer"
                },
                action:{
                    catalog_id: "248997054760053",
                    product_retailer_id: "1oj7wx6b0e"
                } */



        },
        headers: { "Content-Type": "application/json" }
    })
        .then((data) => {
            console.log("message sent successfuly");
            console.log(data.data);
        })
        .catch((err) => {
            console.log(err.response.data);
        });
};
send()

app.get("/", async (req, res) => {
    const ai = await callMakerSuite("who created you")
    res.status(200).json({ message: ai });
});
app.post("/PHONE_NUMBER_ID/messages", (req, res) => { });
// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
    let body = req.body;
    console.log(body)
    
    // Check the Incoming webhook message
    console.log(JSON.stringify(req.body, null, 2));
    
    // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
    if ("object" in req.body) {
        if (
            req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value.messages &&
            req.body.entry[0].changes[0].value.messages[0]
        ) {
            console.log(req.body.object);
            let phone_number_id =
                req.body.entry[0].changes[0].value.metadata.phone_number_id;
                let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
                let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
                axios({
                    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
                url:
                "https://graph.facebook.com/v12.0/" +
                phoneID +
                "/messages?access_token=" +
                token,
                data: {
                    messaging_product: "whatsapp",
                    to: from,
                    text: { body: "Ack: " + msg_body },
                },
                headers: { "Content-Type": "application/json" },
            });
        }
        res.sendStatus(200);
    } else {
        // Return a '404 Not Found' if event is not from a WhatsApp API
        res.sendStatus(404);
    }
}); 

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
/* app.get("/webhook", (req, res) => {
    console.log(req.body);
    /**
     * UPDATE YOUR VERIFY TOKEN
    *This will be the Verify Token value when you set up webhook
    
    const verify_token = process.env.VERIFY_TOKEN;

    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    
    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === verify_token) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
}); */

app.listen(PORT, () => console.log(`webhook is listening on ${PORT}`));