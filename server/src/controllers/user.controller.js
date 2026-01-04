
const User = require("../models/user.model");
const { isBirthdayToday } = require("../utils/date.helper");
const { sendBirthdayMail } = require("../services/email.service");

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User saved", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.sendBirthdayEmails = async () => {
    console.log(" DEBUG: Starting email check...");

    const users = await User.find();
    console.log(` DEBUG: Total users in DB: ${users.length}`);

    const year = new Date().getFullYear();
    console.log(` DEBUG: Current year: ${year}`);

    for (const user of users) {
        console.log(` DEBUG: Checking user ${user.email}, DOB: ${user.dateOfBirth}`);
        console.log(` DEBUG: Is birthday today? ${isBirthdayToday(user.dateOfBirth)}`);
        console.log(` DEBUG: Last emailed year: ${user.lastEmailedYear}`);

        if (
            isBirthdayToday(user.dateOfBirth) &&
            user.lastEmailedYear !== year
        ) {
            console.log(` DEBUG: Should send email to ${user.email}`);
            try {
                await sendBirthdayMail(user);
                user.lastEmailedYear = year;
                await user.save();
                console.log(` Email sent to ${user.email}`);
            } catch (error) {
                console.error(` Failed to send email to ${user.email}:`, error.message);
            }
        }
    }

    console.log("DEBUG: Email check completed");
};

// Add this function
exports.getAllUsers = async (req, res) => {
    try {
        console.log("Getting all users...");
        const users = await User.find().sort({ dateOfBirth: 1 });

        res.status(200).json({
            count: users.length,
            users: users.map(user => ({
                id: user._id,
                username: user.username,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                lastEmailedYear: user.lastEmailedYear
            }))
        });
    } catch (err) {
        console.error(" Error getting users:", err);
        res.status(500).json({ error: "Failed to get users" });
    }
};

