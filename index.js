"use strict";

// Access token for your app
// (copy token from DevX getting started page

// and save it as environment variable into the .env file)


// Imports dependencies and set up http server
import express from "express"
//import axios from "axios"
import bodyparser from "body-parser"
import dotenv from "dotenv"
import WhatsApp from "whatsapp";
import { config } from "process";

dotenv.config()
const PORT = process.env.PORT || 1337; // creates express http server
const token = process.env.WHATSAPP_TOKEN;
const phoneID = process.env.PHONE_NUMBERID;
const waBizID = process.env.WHATSAPP_BIZ_ID;
const app = express()
// Sets server port and logs message on success
//const client=new WhatsApp
//client.messages.send()
//dotenv()



//const senderNumber = process.env.Ph;
/* const wa = new WhatsApp(phoneID );

const prod_message =
{
    "type": "product",
    "body": {
    "text": "optional body text"
    },
    "footer": {
    "text": "optional footer text"
    },
    "action": {
    "catalog_id": "CATALOG_ID",
    "product_retailer_id": "ID_TEST_ITEM_1"
    }
}

wa.messages.interactive( prod_message, 263775231426 );
 */


const phoneNumberId=process.env.WA_PHONE_NUMBER_ID
const recipient_number = "263775231426"
const temporaryToken=process.env.CLOUD_API_ACCESS_TOKEN
const wa = new WhatsApp( phoneNumberId);

async function send_message()
{
    try{
        const sent_text_message = wa.messages.text( { "body" : "Hello world" }, recipient_number );

        await sent_text_message.then( ( res ) =>
        {
            console.log( res.rawResponse() );
        } );
    }
    catch( e )
    {
        console.log( JSON.stringify( e ) );
    }
}

send_message();

const senderNumber = 
wa.webhooks.start( custom_callback );
const send = async () => {
    console.log(phoneID, token,)
    axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url:
            "https://graph.facebook.com/v17.0/" +
            phoneID +
            "/messages?access_token=" +
            token,
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
//send()
//app.listen(PORT, () => console.log(`webhook is listening on ${PORT}`));

app.get("/", async (req, res) => {
    const ai = await callMakerSuite("who created you")
    res.status(200).json({ message: ai });
});
app.post("/PHONE_NUMBER_ID/messages", (req, res) => { });
// Accepts POST requests at /webhook endpoint
/* app.post("/webhook", (req, res) => {
    let body = req.body;

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
}); */

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
