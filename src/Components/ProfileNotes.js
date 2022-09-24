import React from 'react'

function ProfileNotes(props) {
    const { note } = props;
    return (
        <div>
            <div className="card my-3 text-white" style={{ background: "#283645", boxShadow: "2px 2px 10px black" }}>
                <div className="card-body">
                    <p className="card-title">Title : {note.title}</p>
                    <p className="card-title">Tag : {note.tag}</p>
                    <p className="card-text">Description : {note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileNotes
