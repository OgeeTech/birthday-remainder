const router = require("express").Router();
const { createUser, getAllUsers } = require("../controllers/user.controller");

// Handle OPTIONS preflight
router.options("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://bdremindeer.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});

// GET all users
router.get("/", getAllUsers);

// POST create user
router.post("/", createUser);

module.exports = router;