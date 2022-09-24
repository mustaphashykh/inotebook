import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { NotesStates } from '../Context/Notes/NotesState';
function Login() {
    const noteStates = useContext(NotesStates)
    const { showAlert, user } = noteStates

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [icon, setIcon] = useState('fa-solid fa-eye-slash')
    const [inputType, setInputType] = useState('password')
    const changeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const changeIcon = () => {
        if (icon === 'fa-solid fa-eye-slash') {
            setInputType('text');
            setIcon('fa-solid fa-eye');
        } else {
            setInputType('password');
            setIcon('fa-solid fa-eye-slash');
        }
    }
    const getLogged_in = (e) => {
        e.preventDefault();
        LoginUser();
    }
    const LoginUser = async () => {
        let response = await fetch(`http://localhost:5000/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const json_response = await response.json();
        if (json_response.success) {
            localStorage.setItem('is_logged_in', json_response.is_logged_in);
            navigate('/home')
            showAlert("Success", `Welcome back ${user.username}`)
        } else {
            showAlert("Danger", "Wrong Credentials.")
        }
    }
    const resetpassword = useRef(null);

    const OpenModal = () => {
        resetpassword.current.click();
    }
    return (
        <>
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
                <div className=' container my-2'>
                    <div className='row'>
                        <div className=' col-md-4 mx-auto d-block my-5' style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black" }}>
                            <p className='fs-4 text-white my-2 text-center mb-5'>Login</p>
                            <form onSubmit={getLogged_in}>
                                <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-4">
                                    <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1"> @ </span>
                                    <input required style={{ background: "#E6E6E6" }} type="text" className="form-control" placeholder="Username or Email" aria-label="Username" id="email" name='email' aria-describedby="basic-addon1" onChange={changeHandler} />
                                </div>
                                <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-2">
                                    <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                                    <input required style={{ background: "#E6E6E6" }} type={inputType} className="form-control" placeholder="Password" aria-label="Username" id="password" name='password' aria-describedby="basic-addon1" onChange={changeHandler} />
                                    <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon2"><i onClick={changeIcon} style={{ cursor: "pointer" }} id="icon" className={`${icon} fs-6`}></i></span>
                                </div>
                                <div>
                                    <p style={{ color: "#808080db", cursor: "pointer" }} onClick={OpenModal}>Forget password.</p>
                                    <p className='mb-4'><Link style={{ textDecoration: "none", color: "#808080db" }} to="/signup">Want to create new account?</Link></p>
                                </div>
                                <button className='btn mb-4 mx-auto d-block' type='submit' style={{ background: "#E6E6E6", color: "#283645", boxShadow: "2px 2px 15px black" }}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
