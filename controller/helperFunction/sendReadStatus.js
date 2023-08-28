import axios from "axios"
const sendReadStatus = async (url, msg_id) => {
    let read;
    try {
      read=await axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url: url,
            data: {
                messaging_product: "whatsapp",
                status: "read",
                message_id: msg_id
            }
        }).then((result) => {
          
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