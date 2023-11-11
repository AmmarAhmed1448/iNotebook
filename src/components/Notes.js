import React, { useContext } from "react";
import NotesItem from "./NotesItem"
import NotesContext from "../context/notes/NotesContext";
import AddNote from "./AddNotes";


function Notes() {
    const context = useContext(NotesContext);
    const { notes } = context;
    return (
        <>
            <AddNote />
            <div className="row my-3">

                <h1>Your notes</h1>
                {notes.map((notes) => {
                    return <NotesItem key={notes._id} notes={notes} />;
                })}
            </div>

            {/* <div className="row my-3">

<h1>Your notes</h1>
{notes.map((notes) => {
    return <NotesItem key = {notes._id} notes = {notes}/>;
})}
</div> */}

        </>

    );
}

export default Notes;