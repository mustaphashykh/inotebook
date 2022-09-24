import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotesStates } from '../Context/Notes/NotesState'

function ResetPassword() {
    const navigate = useNavigate();
    const notesContext = useContext(NotesStates);
    const { user, getUser } = notesContext;
    useEffect(() => {
        getUser()
    })

    const [credentials, setCredentials] = useState({ password: "", c_password: "" })
    const [icon, setIcon] = useState('fa-solid fa-eye-slash')
    const [inputType, setInputType] = useState('password')
    const [icon2, setIcon2] = useState('fa-solid fa-eye-slash')
    const [inputType2, setInputType2] = useState('password')
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
    const changeIcon2 = () => {
        if (icon2 === 'fa-solid fa-eye-slash') {
            setInputType2('text');
            setIcon2('fa-solid fa-eye');
        } else {
            setInputType2('password');
            setIcon2('fa-solid fa-eye-slash');
        }
    }
    const resetPassword = async (data) => {
        const { password, c_password } = data;
        await fetch('http://localhost:5000/auth/resetPassword', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password, confirm_password: c_password, resetLink: user.resetLink })
        });
    }
    const resetpassword = (e) => {
        e.preventDefault();
        resetPassword(credentials)
        localStorage.removeItem("is_logged_in");
        navigate('/login');
    }
    return (
        <div className='container'>
            <div className=' container my-2'>
                <div className='row'>
                    <div className=' col-md-4 mx-auto d-block my-5' style={{ background: "#283645", borderRadius: "15px", boxShadow: "4px 4px 30px black" }}>
                        <p className='fs-4 text-white my-2 text-center mb-5'>Reset Password</p>
                        <form>
                            <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-4">
                                <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1"> Password </span>
                                <input required style={{ background: "#E6E6E6" }} type={inputType} className="form-control" placeholder="new password" aria-label="password" id="password" name='password' aria-describedby="basic-addon1" onChange={changeHandler} />
                                <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon2"><i onClick={changeIcon} style={{ cursor: "pointer" }} id="icon" className={`${icon} fs-6`}></i></span>
                            </div>
                            <div style={{ boxShadow: "2px 2px 15px black" }} className="input-group mb-2">
                                <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon1">Confirm Password</span>
                                <input required style={{ background: "#E6E6E6" }} type={inputType2} className="form-control" placeholder="Password" aria-label="Username" id="c_password" name='c_password' aria-describedby="basic-addon1" onChange={changeHandler} />
                                <span style={{ background: "#283645", color: "#E6E6E6" }} className="input-group-text" id="basic-addon2"><i onClick={changeIcon2} style={{ cursor: "pointer" }} id="icon" className={`${icon2} fs-6`}></i></span>
                            </div>
                            <button className='btn mb-4 mx-auto d-block mt-4' type='submit' style={{ background: "#E6E6E6", color: "#283645", boxShadow: "2px 2px 15px black" }} onClick={resetpassword}>Save Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
