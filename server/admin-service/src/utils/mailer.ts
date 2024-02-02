import nodemailer, { SendMailOptions } from "nodemailer";
import { config } from "dotenv";
import errorLog from './errorLog'
config({
    path: "../config/config.env",
});

const smtpConfig = {
    service: process.env.SMETP_SERVICE,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10), // Use 587 as the default port if not defined
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_SHORT_TIME_PASS,
    }
};

const transporter = nodemailer.createTransport(smtpConfig);

async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err: any, info: any) => {
        if (err) {
            errorLog(err?.message, err)
            return false;
        }
        return true;
        // log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    });
}

export default sendEmail;