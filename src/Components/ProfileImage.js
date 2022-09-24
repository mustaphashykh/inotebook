import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { NotesStates } from '../Context/Notes/NotesState'
function ProfileImage() {
    const navigate = useNavigate()
    const ref = useRef(null)
    const notesContext = useContext(NotesStates)
    const { upload_profile_image, user, getUser } = notesContext;
    useEffect(() => {
        getUser();
    })
    let { profile_image } = user;
    const [uploadImage, setUploadImage] = useState(null)
    const changeUploadImage = (e) => {
        setUploadImage(e.target.files[0])
    }
    const upload_profile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profile_image", uploadImage, uploadImage.name)
        upload_profile_image(formData);
        navigate("/profile");
    }
    const openFileSelector = (e) => {
        e.preventDefault();
        ref.current.click();
    }
    return (
        <div className='container'>
            <div className='container'>
                <div className='row my-5'>
                    <div className='d-block mx-auto col-md-6' style={{ background: "#E6E6E6", borderRadius: "15px", boxShadow: "4px 4px 30px black" }}>
                        <h3 style={{ color: "#283645" }} className='fs-4 text-center my-3'>Upload Profile Image</h3>
                        <div className='row'>
                            <div className='d-block mx-auto col-md-12' style={{ background: "#283645", borderRadius: "5px", boxShadow: "4px 4px 30px black" }}>
                                <span style={{ float: "right" }}><Link style={{ textDecoration: "none", color: "#E6E6E6" }} to='/login'> Skip </Link></span>
                                <form>
                                    <img src={`http://localhost:5000/${profile_image}`} style={{ width: "120px" }} className="mx-auto d-block rounded-circle mt-5 mb-5" alt="..." />
                                    <div className='d-block mx-auto mb-3'>
                                        <input style={{ display: "none" }} type='file' onChange={changeUploadImage} name='profile_image' ref={ref} />
                                        <div style={{ float: "right" }} className="my-3">
                                            <button className='btn mx-3' style={{ color: "#E6E6E6", outline: "1px solid #E6E6E6" }} onClick={openFileSelector}><i className="fa-solid fa-camera"></i></button>
                                            <button style={{ background: "#E6E6E6", color: "#283645" }} type='submit' className='btn' onClick={upload_profile}>upload</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div >
    )
}

export default ProfileImage
