const mongoose = require('mongoose');
const {Schema} = mongoose;

const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,   
        // * This means it stores MongoDB ObjectIDs, which are unique identifiers used in MongoDB to reference documents in other collections. In this case, it is intended to store references to documents in the "User" collection.
        
        
        ref: "User"                             
        // * This means it stores MongoDB ObjectIDs, which are unique identifiers used in MongoDB to reference documents in other collections. In this case, it is intended to store references to documents in the "User" collection.
    }, 

    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "general"
    },
    date:{
        type: Date,
        default: Date.now
    }

}, {collection: "Notes"});              // * This will create custom name collection named Notes.

module.exports = mongoose.model('Notes', notesSchema);