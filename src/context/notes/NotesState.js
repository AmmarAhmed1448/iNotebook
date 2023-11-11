import React, { useState } from "react";
import NotesContext from "./NotesContext";


// * The NotesState component is a functional component that takes props as an argument. Its primary purpose is to act as a provider for the NotesContext
const NotesState = (props) => {

    const notesInitial = [

        {
            "_id": "653e34a9b95a0e8b59f13b4b",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My first note",
            "description": "This is my first note on my created application",
            "tag": "first",
            "date": "2023-10-29T10:32:09.864Z",
            "__v": 0
        },
        {
            "_id": "653f99c6e473ba45b1c7c85d",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My second note",
            "description": "This is my seconds note on my own created application",
            "tag": "second",
            "date": "2023-10-30T11:55:50.637Z",
            "__v": 0
        },
        {
            "_id": "653f99dbe473ba45b1c7c85f",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My third note",
            "description": "This is my third note on my own created application",
            "tag": "third",
            "date": "2023-10-30T11:56:11.127Z",
            "__v": 0
        },

        {
            "_id": "653e34a9b95ae0e8b59f13b4b",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My first note",
            "description": "This is my first note on my created application",
            "tag": "first",
            "date": "2023-10-29T10:32:09.864Z",
            "__v": 0
        },
        {
            "_id": "653f99c6e473bar45b1c7c85d",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My second note",
            "description": "This is my seconds note on my own created application",
            "tag": "second",
            "date": "2023-10-30T11:55:50.637Z",
            "__v": 0
        },
        {
            "_id": "653f99dbe473bat45b1c7c85f",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My third note",
            "description": "This is my third note on my own created application",
            "tag": "third",
            "date": "2023-10-30T11:56:11.127Z",
            "__v": 0
        },

        {
            "_id": "653e34a9b95a0eu8b59f13b4b",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My first note",
            "description": "This is my first note on my created application",
            "tag": "first",
            "date": "2023-10-29T10:32:09.864Z",
            "__v": 0
        },
        {
            "_id": "653f99c6e473ba45b1ic7c85d",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My second note",
            "description": "This is my seconds note on my own created application",
            "tag": "second",
            "date": "2023-10-30T11:55:50.637Z",
            "__v": 0
        },
        {
            "_id": "653f99dbe473ba45b1oc7c85f",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My third note",
            "description": "This is my third note on my own created application",
            "tag": "third",
            "date": "2023-10-30T11:56:11.127Z",
            "__v": 0
        },
        {
            "_id": "653e34a9b95a0e8b59fa13b4b",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My first note",
            "description": "This is my first note on my created application",
            "tag": "first",
            "date": "2023-10-29T10:32:09.864Z",
            "__v": 0
        },
        {
            "_id": "653f99c6e473ba45b1cs7c85d",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My second note",
            "description": "This is my seconds note on my own created application",
            "tag": "second",
            "date": "2023-10-30T11:55:50.637Z",
            "__v": 0
        },
        {
            "_id": "653f99dbe473ba45b1dc7c85f",
            "user": "6526fe5e25df46beecd8caee",
            "title": "My third note",
            "description": "This is my third note on my own created application",
            "tag": "third",
            "date": "2023-10-30T11:56:11.127Z",
            "__v": 0
        }

    ]

    const [notes, setNotes] = useState(notesInitial);

    // * Add Note

    const addNote = (title, description, tag) =>{
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
    
    // * Edit Note

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
            addNote: addNote
        }}>

            {props.children}
        </NotesContext.Provider>
        // *props.children. This ensures that the components wrapped by NotesState will have access to the state data.
    );

}
export default NotesState;




// * https://chat.openai.com/c/57b0554f-7726-4c74-88fa-2df9acf98615