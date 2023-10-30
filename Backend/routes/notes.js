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



// * Route 3: PUT request at /api/notes/updatenotes
// * This endpoint will existing notes notes of the user. For that the user must be signed in and his JWT token will be verified by the middleware fetchuser
// * Log in required

router.put("/updatenotes/:id", fetchuser,

    // * In Express.js, URL parameters, often referred to as "route parameters" or "route placeholders," are a way to capture values from the URL and make them accessible within your route handlers. They are defined in route paths with a colon (:) followed by the parameter name. When a client makes a request to the specified route, Express extracts the values from the URL and provides them as part of the req.params object.
    // [

    //     // Validations
    //     body("title", "Enter a name").isLength({ min: 3 }),
    //     body("description", "Enter a valid email").isLength({ min: 10 })
    // ],    

    async (req, res) => {
        try {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors });
            // }


            const { title, description, tag } = req.body;

            // * This is creating newNote object
            const newNote = {};

            if (title) { newNote.title = title; }
            if (description) { newNote.description = description; }
            if (tag) { newNote.tag = tag; }


            // * Find the note to be updated and then update it

            // * This code is accessing the notes of the user from the db
            let notes = await Notes.findById(req.params.id);

            // * This code is to ensure that the notes the user is accessing belong to him. i.e he's not trying to access someone else's notes.
            if(notes.user.toString() !== req.user.id){
                res.status(401).send("Not allowed");
            }

            // * This tell that there are no notes available for the given user.
            if(!notes){
                return res.status(400).send("Notes not found")
            }

            notes = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
            // * In the context of Mongoose and MongoDB, $set is often used when you want to update specific fields in a document while leaving other fields unchanged.
            // * new: true returns the modified document rather than the original.
            res.json(notes);


        } catch (error) {
            console.error(error);                                       // .error() writes error to the console
            res.status(500).send("Internal server error occured")      // similar to .json(); .send() also sends response objects
        }
    });


    router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
        try{
            let notes = await Notes.findById(req.params.id);
            if(!notes){
                return res.status(404).send("Notes not found");
            }
            if(notes.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed");
            }

            notes = await Notes.findByIdAndDelete(req.params.id);
            res.send("Note of ID " + req.params.id + " have been deleted.");
        }
        catch(error){
            console.error(error);                                       // .error() writes error to the console
            res.status(500).send("Internal server error occured")      // similar to .json(); .send() also sends response objects
        }
    })



module.exports = router;