import twilio from "twilio"
import config from "config"

let accountSid = config.get("SID")
let authToken = config.get("AUTH_TOKEN")
let phone = config.get("PHONE")

const validateUser = new twilio(accountSid, authToken)
async function sendSMS(smsData) {
    try {
        await validateUser.messages.create({
            body:smsData.body,
            to:smsData.to,
            from: phone
        })
        console.log("SMS sent");
        
    } catch (error) {
        console.log(error);
    }
}

export default sendSMS