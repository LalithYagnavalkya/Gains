import nodemailer, { SendMailOptions } from "nodemailer";
import { config } from "dotenv";
import errorLog from './errorLog'
import catchAsync from "./catchAsync";
config({
    path: "../config/config.env",
});



export const sendEmail = async (emailSubject: string, emailBody: string, sendToEmail: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // eslint-disable-next-line no-undef
            user: process.env.EMAIL_USER,  // Your Gmail email address
            // eslint-disable-next-line no-undef
            pass: process.env.EMAIL_APP_PASS, // Use the app-specific password you generated
        },
    });
    const mailOptions = {
        // eslint-disable-next-line no-undef
        from: process.env.EMAIL_USER,   // Sender email address
        to: sendToEmail,    // Recipient email address
        subject: emailSubject,
        html: emailBody,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            // throw new AppError(500, 'Error Sending Email')
        }
    });
}
export default sendEmail;