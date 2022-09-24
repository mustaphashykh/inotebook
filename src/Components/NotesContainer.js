import React, { useContext, useEffect, useState, useRef } from 'react'
import { NotesStates } from '../Context/Notes/NotesState'
import NotesItems from "./NotesItems"
import { useNavigate } from "react-router-dom";
function NotesContainer() {
  const navigate = useNavigate();
  const notesContext = useContext(NotesStates)
  const { notes, getNotes, updateNote, showAlert } = notesContext;
  let updatingNote = { id: "", title: "new title...", tag: "new tag...", description: "re-write what to do...." }
  const [note, setNote] = useState(updatingNote);
  const ref = useRef(null)
  useEffect(() => {
    if (localStorage.getItem('is_logged_in')) {
      getNotes();
    } else {
      navigate('/login');
    }
  })
  const updateNotes = (note) => {
    ref.current.click();
    updatingNote = {
      id: note._id,
      title: note.title,
      tag: note.tag,
      description: note.description
    }
    setNote(updatingNote)
  }
  const inputContext = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  }
  const changeHandler = () => {
    updateNote(note.id, note)
    showAlert("Success", "Note is updated successfully.")
  }
  return (
    <>
      <button type="button" ref={ref} className="btn text-white card-text mx-2 d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">This is Button</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black" }} className="modal-content">
            <div style={{ background: "#283645", color: "white" }} className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{ background: "#283645" }} className="modal-body">
              <form>
                <div className="input-group">
                  <div className="input-group-text">New Title</div>
                  <input style={{ background: "#E6E6E6" }} type="text" placeholder={updatingNote.title} className="form-control" id="title" name='title' onChange={inputContext} />
                </div><div className='my-3'>
                  <label style={{ background: "#E6E6E6" }} className="visually-hidden" htmlFor="autoSizingInputGroup">NewTag</label>
                  <div className="input-group">
                    <div className="input-group-text">NewTag</div>
                    <input style={{ background: "#E6E6E6" }} type="text" className="form-control" placeholder={updatingNote.tag} id="newtag" name='tag' onChange={inputContext} />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label text-white">Description.</label>
                  <textarea style={{ background: "#E6E6E6" }} className="form-control" id="message-text" name="description" placeholder={updatingNote.description} onChange={inputContext} ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" style={{ background: "#E6E6E6", color: "#283645", fontWeight: "8" }} className="btn" data-bs-dismiss="modal" onClick={changeHandler}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "#E6E6E6", borderRadius: "15px", boxShadow: "4px 4px 30px black" }} className="container my-5">
        <div className='container'>
          <div className='row'>
            {notes.length === 0 ? <div><p style={{ color: "#283645" }} className="text-center my-2 fs-5">No notes available to display.</p></div> : notes.map((note) => {
              return <div key={note._id} className='col-sm-6'>
                <NotesItems note={note} updateNotes={updateNotes} />
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default NotesContainer