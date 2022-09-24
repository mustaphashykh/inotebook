import React, { useState } from 'react'
import { useContext } from 'react'
import { NotesStates } from '../Context/Notes/NotesState'
function AddNotes() {
    const notesContext = useContext(NotesStates);
    const { AddNote, showAlert } = notesContext;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const inputContext = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    const addNote = () => {
        AddNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        showAlert("Success", "Note is added successfully.")
    }
    return (
        <div style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black" }} className="my-5">
            <p style={{ paddingTop: "10px" }} className='fs-3 text-white text-center'>Add Note.</p>
            <div className='container' style={{ padding: "25px 10px" }}>
                <form className="align-items-center">
                    <label className="visually-hidden" htmlFor="autoSizingInputGroup">Title</label>
                    <div className="input-group">
                        <div className="input-group-text">Title</div>
                        <input style={{ background: "#E6E6E6" }} type="text" className="form-control" id="title" name='title' placeholder="title for note..." onChange={inputContext} />
                    </div>
                    <div className='my-3'>
                        <label style={{ background: "#E6E6E6" }} className="visually-hidden" htmlFor="autoSizingInputGroup">Tag</label>
                        <div className="input-group">
                            <div className="input-group-text">Tag</div>
                            <input style={{ background: "#E6E6E6" }} type="text" className="form-control" id="tag" name='tag' placeholder="tag for note..." onChange={inputContext} />
                        </div>
                    </div>
                </form>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label my-2 text-white">Note Down.</label>
                    <textarea style={{ background: "#E6E6E6" }} className="form-control" id="exampleFormControlTextarea1" name='description' placeholder='write your note...' rows="4" onChange={inputContext}></textarea>
                </div>
                <div>
                    <button onClick={addNote} style={{ background: "#E6E6E6", color: "#283645", boxShadow: "2px 2px 15px black", marginLeft: "75%" }} className='btn'>
                        <span>Add</span><i className="fa-duotone fa-plus fs-6">
                        </i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddNotes
