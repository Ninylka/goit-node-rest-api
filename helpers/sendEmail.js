import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config()

const {UKR_NET_PASSWORD, UKR_NET_FROM} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, //25, 465,2525
    secure: true,
    auth : {
        user: UKR_NET_FROM,
        pass: UKR_NET_PASSWORD,
    }
}

export const transport = nodemailer.createTransport(nodemailerConfig);


// export const data = {
//     from: UKR_NET_FROM,
//     to: "javopog636@sentrau.com",
//     subject: "Test email",
//     html: "<strong>Test email</strong>"
// }


const sendEmail = data => {
    const email = {...data, from: UKR_NET_FROM}
    return transport.sendMail(email)
}
export default sendEmail
// transport.sendMail(email)
// .then(()=> console.log ("Email send sucess!"))
// .catch(error => console.log (error.message));