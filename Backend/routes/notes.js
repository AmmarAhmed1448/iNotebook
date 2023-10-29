const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchusers");
const Notes = require("../models/Notes")            // * importing the notes model


// * Route 1: GET request at /api/notes/fetchallnotes
// * This endpoint will fetch notes of the user. For that the user must be signed in and his JWT token will be verified by the middleware fetchuser
// * Log in required
router.get("/fetchallnotes", fetchuser, async (req, res) => {

    try {

    
    const allNotes = await Notes.find({ user: req.user.id });     // * This checks in the for a particular userID in the notes collection. 
    res.json(allNotes);

} catch (error) {
    console.error(error);                                       // .error() writes error to the console
    res.status(500).send("Internal server error occured")      // similar to .json(); .send() also sends response objects    
}
});


// * Route 2: POST request at /api/notes/addnotes
// * This endpoint will add new notes of the user. For that the user must be signed in and his JWT token will be verified by the middleware fetchuser
// * Log in required
router.post("/addnotes", fetchuser,
    [

        // Validations
        body("title", "Enter a name").isLength({ min: 3 }),
        body("description", "Enter a valid email").isLength({ min: 10 }),
    ],


    async (req, res) => {


        try {


            const { title, description, tag } = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors });
            }


            const notes = new Notes({
                title,
                description,
                tag,
                user: req.user.id
            });

            // * The above code is equivalent to:

            // ? const notes = new Notes({
            // ?   title: req.body.title, 
            // ?   description: req.body.description,
            // ?   tag: req.body.tag,
            // ?   user: req.user.id
            // ? })


            const savedNotes = await notes.save();             // * This will save the Notes Schema instance which is stored in notes variable and retrun the saved___________________?  
            res.json(savedNotes);

        } catch (error) {
            console.error(error);                                       // .error() writes error to the console
            res.status(500).send("Internal server error occured")      // similar to .json(); .send() also sends response objects
        }
    });
module.exports = router;