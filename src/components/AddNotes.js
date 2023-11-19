import React, { useContext, useState } from "react";
import NotesContext from "../context/notes/NotesContext";
import Notes from "./Notes";

function AddNote() {
    const context = useContext(NotesContext);
    const { addNote } = context;

    const [note, setNote] = useState({ 
        title: "", 
        description: "", 
        tag: "" 
    })
    const onclick = (e) => {
        e.preventDefault(); // Prevent the default form submission
        addNote(note.title, note.description, note.tag);
        setNote({ 
            title: "", 
            description: "", 
            tag: "" 
        })
    }

    const onchange = (e) => {
        //* Remeber the note variable below is a local variable to this component. 
        // * Don't misundertsand it with the useContext notes variable.
        console.log({...note, [e.target.name]: e.target.value })
        setNote({ ...note, [e.target.name]: e.target.value })

        //* The above updates the note properties
        //* https://www.w3schools.com/react/react_es6_spread.asp

        // * The square brackets around e.target.name indicate that the property name inside note should be based on the value of e.target.name. This allows you to dynamically set the property name in the note object based on the name attribute of the form control that triggered the change.
    }
    return (
        <div>
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" >Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.description} onChange={onchange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.tag} onChange={onchange} required/>
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5} type="submit" className="btn btn-primary" onClick={onclick}>Add Note</button>
            </form>
            {/* <Notes /> */}           
            {/* Do not uncomment this or the applicaiton will be fucked up. */}
        </div>
    );
}


export default AddNote;