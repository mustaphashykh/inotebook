import React, { useRef, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarOptions from './NavbarOptions'
import { NotesStates } from '../Context/Notes/NotesState'

function Setting() {
  useEffect(() => {
    getUser();
  })
  const notesContext = useContext(NotesStates);
  const navigate = useNavigate();
  const { user, Update_User_in_DB, getUser, showAlert, notes, getNotes, forgetPassword } = notesContext;
  useEffect(() => {
    getNotes()
  })

  let Updateuser = { f_name: user.f_name, l_name: user.l_name, username: user.username }
  const [update, setUpdate] = useState(Updateuser)
  const ref = useRef(null)
  const details = useRef(null)
  const resetpassword = useRef(null)
  if (!localStorage.getItem('is_logged_in')) {
    navigate('/login')
  }
  const OpenModel = () => {
    ref.current.click();
  }
  const OpenDetails = () => {
    details.current.click();
  }
  const OpenResetPassword = () => {
    resetpassword.current.click();
    forgetPassword();
  }

  const update_user = () => {
    Update_User_in_DB(update.f_name, update.l_name, update.username)
    showAlert("Success", "User is updated successfully.")
  }
  const changeHandler = (e) => {
    setUpdate({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      <button type="button" ref={ref} className="btn text-white card-text mx-2 d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">This is Button</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black" }} className="modal-content">
            <div style={{ background: "#283645", color: "white" }} className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <p style={{ color: "white" }} className="mt-4 text-center">Fill in the field get to be changed only.</p>
            <div style={{ background: "#283645" }} className="modal-body">
              <form>
                <div className="input-group">
                  <div className="input-group-text">first name</div>
                  <input style={{ background: "#E6E6E6" }} type="text" placeholder={Updateuser.f_name} className="form-control" id="title" name='f_name' onChange={changeHandler} />
                </div>
                <div className='my-3'>
                  <label style={{ background: "#E6E6E6" }} className="visually-hidden" htmlFor="autoSizingInputGroup">NewTag</label>
                  <div className="input-group">
                    <div className="input-group-text">last name</div>
                    <input style={{ background: "#E6E6E6" }} type="text" className="form-control" id="newtag" placeholder={Updateuser.l_name} name='l_name' onChange={changeHandler} />
                  </div>
                </div>
                <div className='my-3'>
                  <label style={{ background: "#E6E6E6" }} className="visually-hidden" htmlFor="autoSizingInputGroup">NewTag</label>
                  <div className="input-group">
                    <div className="input-group-text">username</div>
                    <input style={{ background: "#E6E6E6" }} type="text" className="form-control" id="newtag" name='username' onChange={changeHandler} placeholder={Updateuser.username} />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" style={{ background: "#E6E6E6", color: "#283645", fontWeight: "8" }} className="btn" data-bs-dismiss="modal" onClick={update_user} >Update User</button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" ref={details} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#OpenDetails">
        Launch demo modal
      </button>
      <div style={{ color: "#E6E6E6" }} className="modal fade" id="OpenDetails" tabIndex="-1" aria-labelledby="OpenDetailsLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div style={{ background: "#283645" }} className="modal-header">
              <h5 className="modal-title" id="OpenDetailsLabel">Accounts Details</h5>
              <button type="button" className="btn-close btn-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ background: "#283645" }}>
              <p><strong>Total Notes : </strong>{notes.length < 10 ? "0" + notes.length : notes.length}</p>
              <p><strong>You joint on </strong>{user.date}</p>
            </div>
          </div>
        </div>
      </div>
      <button type="button" ref={resetpassword} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#ResetPassword">
        Launch demo modal
      </button>
      <div style={{ color: "#E6E6E6" }} className="modal fade" id="ResetPassword" tabIndex="-1" aria-labelledby="ResetPasswordLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div style={{ background: "#283645" }} className="modal-header">
              <h5 className="modal-title" id="ResetPasswordLabel">Reset Password</h5>
              <button type="button" className="btn-close btn-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ background: "#283645" }}>
              <p>The link has been sent to your email.</p>
              <p>Please check out : <strong>{user.email}</strong></p>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <NavbarOptions />
        <div className='container'>
          <div className='my-2'>
            <div className='row'>
              <div className=' col-md-8 mx-auto d-block my-5' style={{ background: "#E6E6E6", borderRadius: "15px", boxShadow: "4px 4px 30px black" }}>
                <div className="row">
                  <div className=' col-md-12 mx-auto d-block mt-5' style={{ background: "#283645", borderRadius: "5px", boxShadow: "4px 4px 30px black" }}>
                    <div className='my-5'>
                      <p className='d-block mx-auto p-2 fs-5' onClick={OpenDetails} style={{ cursor: "pointer", width: "90%", background: "#E6E6E6", color: "#283645", borderRadius: "4px", boxShadow: "4px 4px 30px black" }}>Accounts Details</p>
                      <p className='d-block mx-auto p-2 fs-5 mt-3' style={{ cursor: "pointer", width: "90%", background: "#E6E6E6", color: "#283645", borderRadius: "4px", boxShadow: "4px 4px 30px black" }} onClick={OpenModel}>Update Account</p>
                      <p className='d-block mx-auto p-2 fs-5 mt-3' style={{ cursor: "pointer", width: "90%", background: "#E6E6E6", color: "#283645", borderRadius: "4px", boxShadow: "4px 4px 30px black" }} onClick={OpenResetPassword}>Reset Password</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Setting
