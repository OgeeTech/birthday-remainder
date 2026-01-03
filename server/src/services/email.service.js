const transporter = require("../config/mailer");
const fs = require("fs");
const path = require("path");

exports.sendBirthdayMail = async (user) => {
    // FIX: Use correct relative path
    const templatePath = path.join(__dirname, "..", "views", "emailTemplate.html");

    console.log(`Looking for template at: ${templatePath}`); // Debug log

    const template = fs.readFileSync(templatePath, "utf8");

    const html = template.replace("{{name}}", user.username);

    await transporter.sendMail({
        from: `"Birthday Bot" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Happy Birthday!",
        html
    });
};

exports.sendBirthdayMail = async (user) => {
    const templatePath = path.join(__dirname, "..", "views", "emailTemplate.html");

    // Check if file exists
    if (!fs.existsSync(templatePath)) {
        console.error(`Template file not found at: ${templatePath}`);

        // List directory contents to debug
        const viewsDir = path.join(__dirname, "..", "views");
        console.log(`Contents of ${viewsDir}:`);
        try {
            const files = fs.readdirSync(viewsDir);
            console.log(files);
        } catch (err) {
            console.error(`Cannot read views directory: ${err.message}`);
        }

        throw new Error(`Email template not found at ${templatePath}`);
    }

    const template = fs.readFileSync(templatePath, "utf8");
    const html = template.replace("{{name}}", user.username);

    await transporter.sendMail({
        from: `"Birthday Bot" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Happy Birthday!",
        html
    });
};