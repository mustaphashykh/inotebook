import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
function SideOptions() {
    const location = useLocation();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("is_logged_in");
        navigate('/login');
    }
    const back = () => {
        if (location.pathname === '/update_profile_image') {
            navigate('/profile');
        } else {
            navigate('/home');
        }
    }
    return (
        <div className='d-flex justify-content-evenly' >
            < div style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black" }} className="text-white p-2 mx-1">
                <div>
                    {location.pathname !== '/home' && <span onClick={back} className="p-2 btn"><Link style={{ textDecoration: "none" }} className="text-white" to='/signup'><i className="fa-solid fa-arrow-left"></i></Link></span>}
                    {!(localStorage.getItem("is_logged_in")) && <span className="p-2 btn"><Link style={{ textDecoration: "none" }} className="text-white" to='/signup'>Signup</Link></span>}
                    {!(localStorage.getItem("is_logged_in")) ? <span className="p-2 btn"><Link style={{ textDecoration: "none" }} className="text-white" to='/login'>Login</Link></span> :
                        <span className="p-2 btn"><Link style={{ textDecoration: "none" }} className="text-white" to='/login' onClick={logout}>Logout</Link></span>}
                    <span className="p-2 fs-4 btn"><Link className="text-white" to='/help'><i className="fa-solid fa-circle-question"></i></Link></span>
                </div>
            </div>
        </div >
    )
}

export default SideOptions
