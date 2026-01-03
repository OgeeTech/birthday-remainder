const cron = require("node-cron");
const { sendBirthdayEmails } = require("../controllers/user.controller");

console.log("✅ Cron scheduler loaded");

// Production: Daily at 7 AM Lagos time
cron.schedule(
    "0 7 * * *", // At 07:00 every day
    async () => {
        console.log(` ${new Date().toISOString()}: Running birthday check...`);
        try {
            await sendBirthdayEmails();
            console.log(" Birthday check completed");
        } catch (error) {
            console.error(" Birthday check failed:", error.message);
        }
    },
    {
        timezone: "Africa/Lagos",
        scheduled: true
    }
);

// Development: Only run test cron if NODE_ENV is development
if (process.env.NODE_ENV === "development") {
    cron.schedule("*/5 * * * *", async () => {
        console.log("Development: Test cron running...");
        await sendBirthdayEmails();
    });
}