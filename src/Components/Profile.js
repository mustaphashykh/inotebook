import React, { useContext, useEffect } from 'react'
import { NotesStates } from '../Context/Notes/NotesState'
import { Link, useNavigate } from 'react-router-dom'
import NotesItems from './NotesItems'
import NavbarOptions from './NavbarOptions';

function Profile() {
    const navigate = useNavigate();
    const notesContext = useContext(NotesStates)
    const { notes, user, getUser, getNotes } = notesContext;
    const { f_name, l_name, username, profile_image } = user;
    useEffect(() => {
        if (localStorage.getItem("is_logged_in")) {
            getUser();
            getNotes();
        } else {
            navigate('/login');
        }
    })
    if (!localStorage.getItem('is_logged_in')) {
        navigate('/login')
    }
    return (
        <div className='container'>
            <NavbarOptions />
            <div className=' container'>
                <div className='row'>
                    <div className=' col-md-12 mx-auto d-block my-5' style={{ background: "#E6E6E6", borderRadius: "15px", boxShadow: "4px 4px 30px black" }}>
                        <div className='row' style={{ background: "#283645", borderRadius: "5px", boxShadow: "4px 4px 30px black", marginTop: "7%" }}>
                            <div className=' col-md-12 mt-3'>
                                <Link to="/UpdateProfileImage"><div className='btn text-white justify-content-end'><i className="fa-solid fa-pen-to-square text-white mx-1"></i>Change Profile</div></Link>
                                <img src={`http://localhost:5000/${profile_image}`} style={{ width: "10em", border: "1px solid #E6E6E6" }} className="mx-auto d-block rounded-circle mt-5" alt="..." />
                            </div>
                            <div className='my-3 text-white'>
                                <p className='text-center'>{f_name} {l_name}</p>
                                <p style={{ color: "#808080db" }} className='text-center'>@{username}</p>
                                <div className='container my-5'>
                                    <div className='row'>
                                        <div style={{ background: "#E6E6E6", borderRadius: "15px", boxShadow: "4px 4px 30px black" }} className='col-md-12 mx-auto d-block'>
                                            <p style={{ color: "#283645" }} className='fs-4 my-3 text-center'>Your Notes.<span className='fs-6'> (secured in cloud)</span></p>
                                            <div className='row'>
                                                {notes.length === 0 ? <div><p style={{ color: "#283645" }} className="text-center my-2 fs-5">No notes available to display.</p></div> : notes.map((note) => {
                                                    return <div key={note._id} className='col-sm-6'>
                                                        <NotesItems note={note} />
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
