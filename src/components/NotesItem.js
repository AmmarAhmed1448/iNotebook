import React, { useContext } from "react";
import NotesContext from "../context/notes/NotesContext";

function NotesItem(props) {
    const { notes, updateNotes } = props;
    const context = useContext(NotesContext);
    const {deleteNotes} = context;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={() =>{deleteNotes(notes._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNotes(notes)}}></i>
                </div>
            </div>
        </div>
    );
}

export default NotesItem;