import React from 'react'
import NavbarOptions from './NavbarOptions'
import { Link, useNavigate } from 'react-router-dom'
function UpdateUser() {
    const navigate = useNavigate();
    if (!localStorage.getItem('is_logged_in')) {
        navigate('/login')
    }
    return (<>
        <div className=' container my-4'>
            <NavbarOptions />
            <div className='row'>
                <div className=' col-md-8 mx-auto d-block my-5' style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black" }}>
                    <div style={{ padding: "1% 1%", background: "#E6E6E6", borderRadius: "5px", boxShadow: "4px 4px 30px black" }} className='my-3'>
                        <Link style={{ textDecoration: 'none' }} className='text-black fs-5' to='update_user'>Update Account</Link>
                    </div>
                    <div style={{ padding: "1% 1%", background: "#E6E6E6", borderRadius: "5px", boxShadow: "4px 4px 30px black" }} className='my-3'>
                        <Link style={{ textDecoration: 'none' }} className='text-black fs-5' to='reset_password'>Reset Password</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default UpdateUser
