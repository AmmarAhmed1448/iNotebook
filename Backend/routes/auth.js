const express = require("express");
const router = express.Router();
const User = require("../models/User")

router.post("/", (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    res.send(req.body);
    user.save();
});

module.exports = router;