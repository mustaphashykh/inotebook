import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NotesStates } from '../Context/Notes/NotesState'

function NavbarOptions() {
    const notesContext = useContext(NotesStates);
    const { user, getUser } = notesContext;
    const { profile_image } = user;
    useEffect(() => {
        getUser();
    })

    return (
        <div style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black", width: "80%" }} className="text-white p-2 mt-3 mx-auto d-block">
            <div className='d-flex justify-content-evenly'>
                <Link className='text-white btn text-center' to='/home'><i className="fa-solid fa-house fs-4"></i></Link>
                <Link className='text-white btn text-center' to='/about'><i className="fa-solid fa-address-card fs-4"></i></Link>
                <Link style={{ textDecoration: "none" }} className="btn text-white text-center" to='/setting'><i className="fa-solid fa-gear fs-4"></i></Link>
                <Link style={{ textDecoration: "none" }} className="text-white btn" to='/profile'>
                    <img src={`http://localhost:5000/${profile_image}`} style={{ width: "30px", border: "1px solid #E6E6E6" }} className="rounded-circle" alt="..." />
                </Link>
            </div>
        </div>
    )
}

export default NavbarOptions
