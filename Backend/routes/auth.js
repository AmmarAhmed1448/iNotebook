const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");

router.post("/", 
[
    body("name", "Enter a name").notEmpty(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({min:10}),
    // Check if the email is unique
    body("email").custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('Email is already in use');
        }
    })

]
, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
    console.log(req.body);
    const user = new User(req.body);
    // res.send(req.body);
    // user.save();

    // Does the same job as newUser() + user.save()
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    }).then(user => res.json(user))
    .catch(err => res.json({error: err}));

});

module.exports = router;