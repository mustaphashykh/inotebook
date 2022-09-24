import React, { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotesStates } from '../Context/Notes/NotesState'

function UploadProfileImage() {
    const navigate = useNavigate();
    if (!localStorage.getItem('is_logged_in')) {
        navigate('/login')
    }
    const ref = useRef(null)
    const notesContext = useContext(NotesStates)
    const { update_profile_image, user, getUser } = notesContext;
    useEffect(() => {
        getUser();
    })
    const { profile_image } = user;
    const [updateImage, setUpdateImage] = useState('')
    const changeImage = (e) => {
        setUpdateImage(e.target.files[0])
    }
    const update_profile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profile_image", updateImage, updateImage.name)
        update_profile_image(formData);
        navigate('/profile')
    }
    const openFileSelector = (e) => {
        e.preventDefault();
        ref.current.click();
    }
    return (
        <div className='container'>
            <div className='row my-5'>
                <div className='d-block mx-auto col-md-6' style={{ background: "#E6E6E6", borderRadius: "15px", boxShadow: "4px 4px 30px black" }}>
                    <h3 style={{ color: "#283645" }} className='fs-4 text-center my-3'>Update Profile Image</h3>
                    <div className='row'>
                        <div className='d-block mx-auto col-md-12' style={{ background: "#283645", borderRadius: "8px", boxShadow: "4px 4px 30px black" }}>
                            <form>
                                <img src={`http://localhost:5000/${profile_image}`} style={{ width: "120px" }} className="mx-auto d-block rounded-circle mt-5 mb-5" alt="..." />
                                <div className='d-block mx-auto mb-3'>
                                    <input style={{ display: "none" }} type='file' onChange={changeImage} accept="/image/*" name='profile_image' ref={ref} />
                                    <div style={{ float: "right" }} className="mb-3">
                                        <button className='btn mx-3' style={{ color: "#E6E6E6", outline: "1px solid #E6E6E6" }} onClick={openFileSelector}><i className="fa-solid fa-camera"></i></button>
                                        <button style={{ background: "#E6E6E6", color: "#283645" }} type='submit' className='btn' onClick={update_profile}>upload</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default UploadProfileImage
