import nodemailer, { SendMailOptions } from "nodemailer";
import { config } from "dotenv";
import errorLog from './errorLog'
import catchAsync from "./catchAsync";
config({
    path: "../config/config.env",
});

const smtpConfig = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465, // Use 587 as the default port if not defined
    secure: true,
    auth: {
        user: 'lalithyagnavalkyatirunagari@gmail.com',
        pass: '18tq1a059990489959844490zero;elementnumber1hydrogen',
    }
};
// const smtpConfig = {
//     service: process.env.SMETP_SERVICE,
//     host: process.env.SMTP_HOST,
//     port: parseInt(process.env.SMTP_PORT || '587', 10), // Use 587 as the default port if not defined
//     secure: process.env.SMTP_SECURE === 'true',
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_SHORT_TIME_PASS,
//     }
// };

// const transporter = nodemailer.createTransport(smtpConfig);

// async function sendEmail(payload: SendMailOptions) {
//     transporter.sendMail(payload, (err: any, info: any) => {
//         if (err) {
//             errorLog(err?.message, err)
//             return false;
//         }
//         return true;
//         // log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
//     });
// }

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
        from: process.env.SMTP_USER,   // Sender email address
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