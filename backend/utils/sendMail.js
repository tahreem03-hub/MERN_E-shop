const nodemailer = require("nodemailer");
const sendMail = async (options) => {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        });

        console.log("Message sent: %s", info.messageId);
        
    } catch (err) {
        console.error("Error while sending mail:", err);
    }

}

module.exports = sendMail;