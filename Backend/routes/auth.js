const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "HELLO@FUCKING@WORLD";
const fetchuser = require("../middleware/fetchusers");
router.post("/createUser",




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
        body("password", "Enter a valid password").isLength({ min: 10 }),
    ]





    , async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

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

        // console.log(hashedPassword);

        
        // Code to generate salts
        // bcrypt.genSalt(10, (error, saltStr) => {
            //         if(error){
                //         console.log("Error in salt");
                //     }
                //     else if(saltStr){tg5
                //         console.log("Salt Generated" + saltStr);
                //     }
                // })
                
                
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                
                
                
                
        // Does the same job as newUser() + user.save()
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword

        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(authToken);
            res.json({ authToken })
        })
            .catch(err => {
                console.log("error");
                res.status(500).json({ error: err })
            });

    });







// Creating a login endpoint
router.post("/login",


    // For validation, use const { body, validationResult } = require('express-validator');
    // https://chat.openai.com/c/6bea7a62-32fe-4e5e-853c-5130f4e0083b
    [
        body("email", "Enter a valid email").notEmpty().isEmail().escape(),
        body("password").exists().notEmpty()
    ],


    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty())
            return res.status(400).json({ errors: result.array() });

        let { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            // in the above line the {email} is equivalent to {email: req.body.email}
            // {email}; in this code, the email variable destructured above the try is used. this email variable contains the email in the request. So when we write {email}, the variable name become the property and its value i.e the value of the email variable becomes its value so we get an object.
            // when the email is found, findOne() returns the complete document (record) and is stored in user variable 

            console.log(user);          // this console will show the whole document as JSON
            if (!user) {
                return res.status(400).json({ error: "Enter corrent credentials" });
            }

            let decryptedPassword = await bcrypt.compare(password, user.password);
            if (!decryptedPassword) {
                res.status(400).json({ error: "Enter correct fucking credentials" });
            }


            // In the payload below, I am sending just the id of the user. This id will be used to sign am authtoken for the user.
            const payload = {
                user:
                    { id: user.id }
            };

            const authToken = jwt.sign(payload, JWT_SECRET);            // this signs an authtoken based on the secret key
            res.json({ authToken });

        } catch (error) {
            console.error(error);                                       // .error() writes error to the console
            res.status(500).send("Internal server error occured")      // similar to .json(); .send() also sends response objects

        }
    }

)


// Route 3:

router.post("/getuser",
    [
        body("email", "Enter a valid email").notEmpty().isEmail().escape(),
        body("password").exists().notEmpty()
    ],


    fetchuser,

    async (req, res) => {
        try {
            const userId = req.user.id;                 // See payload in the login endpoint code.

            // ! Remember to put await with queries.
            const userRecordBasedOnId = await User.findById(userId).select("-password")     //* "-password" says that donot select the password fields


            // Convert the document to a string with circular references handled
            // const userRecordString = flatted.stringify(userRecordBasedOnId);
            res.json(userRecordBasedOnId);

            console.log(userRecordBasedOnId);
        } catch (error) {                           //? This catch block is to handle any unexpected error 
            console.error(error);                                       // .error() writes error to the console
            res.status(500).send("Internal server error occured")      // similar to .json(); .send() also sends response objects
        }
    })






module.exports = router;




// Mongo DB uses Document-Oriented data model.
// Collection = Table
// Documents = Rows
// 