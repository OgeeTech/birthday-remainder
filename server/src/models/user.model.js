const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    dateOfBirth: Date,
    lastEmailedYear: Number
});

module.exports = mongoose.model("User", UserSchema);
