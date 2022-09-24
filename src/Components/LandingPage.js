import React from 'react'
import NavbarOptions from './NavbarOptions'

function LandingPage() {
    return (
        <div className='container'>
            {localStorage.getItem('is_logged_in') && < NavbarOptions />}
            <div className='container text-white text-center my-5'>
                <p className='fs-2 mt-5' style={{ fontFamily: "Lucida Handwriting" }}>iNoteBook</p>
                <p className='fs-5'>( Your secure notes inside the cloud ) </p>
                <p className='fs-5'>Signup now to avail the oppurtunity of e-notebook for free</p>
            </div>
        </div>
    )
}

export default LandingPage
