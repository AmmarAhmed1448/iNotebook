import React, { useState } from "react";
import NotesContext from "./NotesContext";


// * The NotesState component is a functional component that takes props as an argument. Its primary purpose is to act as a provider for the NotesContext
const NotesState = (props) => {

    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    //* Get all notes
    const getNotes = async(title, description, tag) => {
        
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyNmZlNWUyNWRmNDZiZWVjZDhjYWVlIn0sImlhdCI6MTY5ODU2MTgxNH0.Fx_NNHIT1cWFeN-Xq0_ZNK1mBb-nMGxDL4CMeGpwnok",

            }

        });
        const json = await response.json();
        // console.log(json);
        setNotes(json)

    }
    // * Add Note

    const addNote = async(title, description, tag) => {
        
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyNmZlNWUyNWRmNDZiZWVjZDhjYWVlIn0sImlhdCI6MTY5ODU2MTgxNH0.Fx_NNHIT1cWFeN-Xq0_ZNK1mBb-nMGxDL4CMeGpwnok",

            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects
        const dummyAddNote = {
            "_id": "653f99dbe473ba45b1dc7c85f",
            "user": "6526fe5e25df46beecd8caee",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-10-30T11:56:11.127Z",
            "__v": 0
        }
        const updatedNotes = [...notes, dummyAddNote]

        // const updatedNotes = [notes.concat(dummyAddNote)]

        // setNotes(setNotes(notes.push(dummyAddNote)));
        setNotes(updatedNotes);
    }
    // * Delete Note

    const deleteNotes = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyNmZlNWUyNWRmNDZiZWVjZDhjYWVlIn0sImlhdCI6MTY5ODU2MTgxNH0.Fx_NNHIT1cWFeN-Xq0_ZNK1mBb-nMGxDL4CMeGpwnok",

            },
        });
        const json =  response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    // * Edit Note

    const editNotes = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyNmZlNWUyNWRmNDZiZWVjZDhjYWVlIn0sImlhdCI6MTY5ODU2MTgxNH0.Fx_NNHIT1cWFeN-Xq0_ZNK1mBb-nMGxDL4CMeGpwnok",

            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects


        // const [newNotes, setNewNotes] = useState(notes)
        // const newNotes = notes;
        const newNotes = JSON.parse(JSON.stringify(notes));
        // console.log("NewNotes" + newNotes);
        // console.log(newNotes2);
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);

        // setNotes()
    }
    // * Inside the component, a state object is defined. This object holds data that you want to provide to other components through the NotesContext
    // const s1 = {
    //     name: "Ammar",
    //     class: "5b"
    // };

    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             name: "Zain",
    //             class: "10b"
    //         })
    //     }, 2000);
    // }

    return (

        // *This is where the actual data-sharing takes place. The <NotesContext.Provider> component is a part of the context API provided by React. It wraps the contents you want to share. In this case, the value prop is set to the state object, which is the data you want to make available to other components. The value prop can hold any data you want to provide.


        //* We need to pass the state and functions in the form of an object
        <NotesContext.Provider value={{
            // state: state, 
            // update: update 

            notes: notes,
            addNote: addNote,
            deleteNotes: deleteNotes,
            getNotes: getNotes,
            editNotes: editNotes
        }}>

            {props.children}
        </NotesContext.Provider>
        // *props.children. This ensures that the components wrapped by NotesState will have access to the state data.
    );

}
export default NotesState;




// * https://chat.openai.com/c/57b0554f-7726-4c74-88fa-2df9acf98615