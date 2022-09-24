// import React, { useState } from 'react'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { NotesStates } from '../Context/Notes/NotesState'
function NotesItems(props) {
    const notesContext = useContext(NotesStates);
    const { deleteNote, showAlert } = notesContext;
    const { note, updateNotes } = props;
    const location = useLocation();
    return (
        <div>
            <div className="card my-3 text-white" style={{ background: "#283645", boxShadow: "2px 2px 10px black" }}>
                <div className="card-body">
                    <p className="card-title">Title : {note.title}</p>
                    <p className="card-title">Tag : {note.tag}</p>
                    <p className="card-text">Description : {note.description}</p>
                    {location.pathname === '/home' && <button onClick={() => { updateNotes(note) }} description="delete note" style={{ cursor: "pointer" }} className="btn text-white card-text mx-2"><i className="fa-solid fa-pen-to-square"></i></button>}
                    {location.pathname === '/home' && <button onClick={() => { deleteNote(note._id); showAlert("Success", "Note is deleted successfully.") }} description="delete note" style={{ cursor: "pointer" }} className="btn text-white card-text mx-2"><i className="fa-solid fa-trash-can"></i></button>}
                </div>
            </div>
        </div>
    )
}

export default NotesItems
