import axios from "axios"
const sendReadStatus = async (url, msg_id) => {
    console.log(process.env.WHATSAPP_TOKEN)
    let read;
    try {
      read=await axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url: url,
            data: {
                messaging_product: "whatsapp",
                message_id: msg_id,
                status:"read",
            },headers:{ "Content-Type": "application/json","Authorization":process.env.WHATSAPP_TOKEN }
        // set response header
        }).then((result) => {
          console.log(result.data)
            if (result.data.success) {
                console.log("Message sett as seen")
                return true
            }
            else return false
        })
    } catch (err) {
        console.log(err)
    }
    console.log(read)
    return read
}
export default sendReadStatus;