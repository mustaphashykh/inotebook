import NavbarOptions from "./NavbarOptions"
import React from 'react'
import { useNavigate } from "react-router-dom"

function About() {
    const navigate = useNavigate();
    if (!localStorage.getItem('is_logged_in')) {
        navigate('/login')
    }
    return (
        <div className="container">
            <NavbarOptions />
        </div>
    )
}

export default About
