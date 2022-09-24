import React from 'react'
import SideOptions from './SideOptions';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-xl">
                <div style={{ padding: "10px 10px" }} className="container-fluid">
                    <Link style={{ fontFamily: "Lucida Handwriting" }} className="navbar-brand text-white fs-3" to="/">iNoteBook</Link>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span> <i className="fa-solid fa-angle-down"></i> </span>
                    </button>
                    <div style={{ paddingTop: '12px' }} className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className="input-group mb-3">
                                    <input style={{ background: "#E6E6E6", boxShadow: "0px 2px 10px black" }} type="text" className="form-control" placeholder="title to search in notes." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    <button style={{ boxShadow: "5px 2px 10px black" }} className="btn text-white" type="button" id="button-addon2"><i className="fa fa-magnifying-glass"></i></button>
                                </div>
                            </li>
                        </ul>
                        <SideOptions />
                    </div>
                </div>
            </nav>
            <hr className='text-white'></hr>
        </div>
    )
}

export default Navbar
