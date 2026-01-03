const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587, // Try this instead of 465
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // For development only
    }
});