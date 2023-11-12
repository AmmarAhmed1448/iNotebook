import React, { useContext, useEffect, useRef, useState } from "react";
import NotesItem from "./NotesItem"
import NotesContext from "../context/notes/NotesContext";
import AddNote from "./AddNotes";


function Notes() {
    const context = useContext(NotesContext);
    const { notes, getNotes, editNotes } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
    })

    const updateNotes = (currentNote) => {
        ref.current.click();
        console.log("Current Note:", currentNote);
        console.log("Current Note:", { etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const onclick = (e) => {
        editNotes(note.id, note.etitle, note.edescription, note.etag)
        e.preventDefault(); // Prevent the default form submission
        refClose.current.click();
    }

    const onchange = (e) => {
        //* Remeber the note variable below is a local variable to this component. 
        // * Don't misundertsand it with the useContext notes variable.
        console.log({ ...note, [e.target.name]: e.target.value })
        setNote({ ...note, [e.target.name]: e.target.value })

        //* The above updates the note properties
        //* https://www.w3schools.com/react/react_es6_spread.asp

        // * The square brackets around e.target.name indicate that the property name inside note should be based on the value of e.target.name. This allows you to dynamically set the property name in the note object based on the name attribute of the form control that triggered the change.
    }

    return (
        <>
            <AddNote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" >Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose}  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="row my-3">

<h1>Your notes</h1>
{notes.map((notes) => {
    return <NotesItem key = {notes._id} notes = {notes}/>;
})}
</div> */}
            <div className="row my-3">

                <h1>Your notes</h1>
                {notes.map((notes) => {
                    return <NotesItem key={notes._id} updateNotes={updateNotes} notes={notes} />;
                })}
            </div>
        </>

    );
}

export default Notes;