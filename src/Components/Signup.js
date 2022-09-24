import React, { useRef, useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { NotesStates } from '../Context/Notes/NotesState';
function Signup() {
    const noteStates = useContext(NotesStates);
    const { showAlert } = noteStates;
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ f_name: "", l_name: "", username: "", email: "", password: "", confirm_password: "", code: "" })
    const ref = useRef(null)
    const [icon, setIcon] = useState('fa-solid fa-eye-slash');
    const [Cicon, setCIcon] = useState('fa-solid fa-eye-slash');
    const [inputType, setInputType] = useState('password');
    const [CinputType, setCInputType] = useState('password');
    const changeIcon = () => {
        if (icon === 'fa-solid fa-eye-slash') {
            setInputType('text');
            setIcon('fa-solid fa-eye');
        } else {
            setInputType('password');
            setIcon('fa-solid fa-eye-slash');
        }
    }
    const CchangeIcon = () => {
        if (Cicon === 'fa-solid fa-eye-slash') {
            setCInputType('text');
            setCIcon('fa-solid fa-eye');
        } else {
            setCInputType('password');
            setCIcon('fa-solid fa-eye-slash');
        }
    }
    const changeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const signupUser = (e) => {
        e.preventDefault();
        ref.current.click();
        codeRequest();
    }
    const codeRequest = async () => {
        await fetch(`http://localhost:5000/auth/gencode`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
    }
    const Signup_User = async () => {
        let response = await fetch(`http://localhost:5000/auth/signup`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const json_response = await response.json();
        if (json_response.success) {
            navigate('/login')
            showAlert("Success", "You have signed up successfully.")
        } else {
            showAlert("Danger", "Something is worng please try again with a unique USERNAME or Authentic E-MAIL")
        }
    }
    const User_dispatch = (e) => {
        e.preventDefault();
        Signup_User();
    }
    return (
        <>
            <button type="button" ref={ref} className="btn text-white card-text mx-2 d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">This is Button</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black" }} className="modal-content">
                        <div style={{ background: "#283645", color: "white" }} className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmation Code</h5>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <p style={{ color: "white" }} className="mt-4 text-center">Please visit : <b>{credentials.email}</b> for confirmation code.</p>
                        <div style={{ background: "#283645" }} className="modal-body">
                            <form>
                                <div className='my-1'>
                                    <label style={{ background: "#E6E6E6" }} className="visually-hidden" htmlFor="autoSizingInputGroup">NewTag</label>
                                    <div className="input-group">
                                        <div className="input-group-text">Code</div>
                                        <input style={{ background: "#E6E6E6" }} type="text" className="form-control" id="newtag" placeholder="confirmation code" name='code' onChange={changeHandler} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" style={{ background: "#E6E6E6", color: "#283645", fontWeight: "8" }} className="btn" data-bs-dismiss="modal" onClick={User_dispatch} >Confirm Code</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='container my-2'>
                    <div className='row '>
                        <div className='mx-auto d-block col-md-4 my-5' style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black" }}>
                            <p className='fs-4 text-white my-2 text-center mb-5'>Sign Up </p>
                            <form onSubmit={signupUser}>
                                <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-4">
                                    <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1">First Name</span>
                                    <input required style={{ background: "#E6E6E6", cursor: "pointer" }} type="text" className="form-control" placeholder="first name" aria-label="Username" id="f_name" name='f_name' aria-describedby="basic-addon1" onChange={changeHandler} />
                                </div>
                                <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-4">
                                    <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1">Last Name</span>
                                    <input required style={{ background: "#E6E6E6", cursor: "pointer" }} type="text" className="form-control" placeholder="last name" aria-label="Username" id="l_name" name='l_name' aria-describedby="basic-addon1" onChange={changeHandler} />
                                </div>
                                <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-4">
                                    <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1">Username</span>
                                    <input required style={{ background: "#E6E6E6", cursor: "pointer" }} type="text" className="form-control" placeholder="username" aria-label="Username" id="username" name='username' aria-describedby="basic-addon1" onChange={changeHandler} />
                                </div>
                                <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-4">
                                    <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1"> Email </span>
                                    <input required style={{ background: "#E6E6E6" }} type="text" className="form-control" placeholder="email" aria-label="Username" id="email" name='email' aria-describedby="basic-addon1" onChange={changeHandler} />
                                </div>
                                <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-4">
                                    <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1">Password</span>
                                    <input required style={{ background: "#E6E6E6" }} type={inputType} className="form-control" placeholder="password" aria-label="Username" id="password" name='password' aria-describedby="basic-addon1" onChange={changeHandler} />
                                    <span style={{ background: "#283645", color: "#E6E6E6", cursor: "pointer" }} className="input-group-text" id="basic-addon2"><i onClick={changeIcon} id="icon" className={`${icon} fs-6`}></i></span>
                                </div>
                                <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-2">
                                    <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1">Confirm Password</span>
                                    <input required style={{ background: "#E6E6E6" }} type={CinputType} className="form-control" placeholder="confirm password" aria-label="Username" id="confirm_password" name='confirm_password' aria-describedby="basic-addon1" onChange={changeHandler} />
                                    <span style={{ background: "#283645", color: "#E6E6E6", cursor: "pointer" }} className="input-group-text" id="basic-addon2"><i onClick={CchangeIcon} className={`${Cicon} fs-6`}></i></span>
                                </div>
                                <div className='mb-4'><p><Link style={{ textDecoration: "none", color: "#808080db" }} to="/login">Already have an account?</Link></p></div>
                                <button className='btn mb-4 mx-auto d-block' type='submit' style={{ background: "#E6E6E6", color: "#283645", boxShadow: "2px 2px 15px black" }}>Sign-Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Signup
