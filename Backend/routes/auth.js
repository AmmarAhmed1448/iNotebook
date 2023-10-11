const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", 




[

    // Validations
    body("name", "Enter a name").notEmpty(),
    body("email", "Enter a valid email").isEmail(),
    // Check if the email is unique
    body("email").custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('Email is already in use');
        }
    }),
    body("password", "Enter a valid password").isLength({min:10}),

]





,  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
        
    }
    
    console.log(req.body);
    
    //     bcrypt
//   .genSalt(10)
//   .then(salt => {
//     console.log('Salt: ', salt)
//     return bcrypt.hash("Ammar", salt)
//   })
//   .then(hash => {
//     console.log('Hash: ', hash);
//     hashedPassword = hash;
//   })
//   .catch(err => console.error(err.message))


//     const hasher = async function (){
    //         await bcrypt.genSalt(1, async function(err, salt) {
        //     await bcrypt.hash(req.body.password, salt, function(err, hash) {
            //         // Store hash in your password DB.
            //         if(err){
                //             console.log("not hashed" + hashedPassword);
                //             return
                //         }
                //         hashedPassword = hash;           
    //     })
    
    //     await User.create({
        //         name: req.body.name,
        //         email: req.body.email,
        //         password: hashedPassword,
        
        //     }).then(user => res.json(user))
        //     .catch(err => {
    //         res.status(500).json({error: err})
    //     });
    // })}


    
    // const user = new User(req.body);
    // res.send(req.body);
    // user.save();
    
    // Does the same job as newUser() + user.save()
    // console.log(hashedPassword);

    
    // Code to generate salts
    // bcrypt.genSalt(10, (error, saltStr) => {
    //         if(error){
    //         console.log("Error in salt");
    //     }
    //     else if(saltStr){
    //         console.log("Salt Generated" + saltStr);
    //     }
    // })
    
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    
    
    
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
        
    }).then(user => res.json(user))
    .catch(err => {
        console.log("error");
        res.status(500).json({error: err})
    });

});

module.exports = router;