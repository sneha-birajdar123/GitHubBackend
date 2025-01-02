import nodemailer from "nodemailer"
import config from "config"

let userEmail = config.get("EMAIL")
let appPassword = config.get("APP_PASSWORD")

async function sendEmail(emailData) {
    try {
        let validateUser = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: userEmail,
                pass: appPassword
            }
        })
        let sender = validateUser.sendMail({
            from: emailData.from,
            subject: emailData.subject,
            to: emailData.to,
            text: emailData.text
        })
        console.log("Email send successfully");
        
    } catch (error) {
        console.log(error);
    }
}
export default sendEmail