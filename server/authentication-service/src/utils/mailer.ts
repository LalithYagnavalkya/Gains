import nodemailer, { SendMailOptions } from "nodemailer";
import { config } from "dotenv";

config({
    path: "../config/config.env",
});

const smtpConfig = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10), // Use 587 as the default port if not defined
    secure: process.env.SMTP_SECURE === 'true', // Convert the string to a boolean
};

const transporter = nodemailer.createTransport({
    ...smtpConfig,
    auth: { user: smtpConfig.user, pass: smtpConfig.pass },
});

async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err: any, info: any) => {
        if (err) {
            //log error in future
            return false;
        }
        return true;
        // log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    });
}

export default sendEmail;