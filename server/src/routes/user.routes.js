const router = require("express").Router();
const { createUser } = require("../controllers/user.controller");

// Handle OPTIONS preflight for /api/users
router.options("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://bdremindeer.netlify.app");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});

router.post("/", createUser);

module.exports = router;