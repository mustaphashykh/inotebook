import React, { useContext } from 'react'
import { NotesStates } from '../Context/Notes/NotesState';

function Alert(props) {
  const noteStates = useContext(NotesStates);
  const { setAlert, setMessage } = noteStates;
  setTimeout(() => {
    setAlert(null);
    setMessage(null);
  }, 9000);
  return (
    <div style={{ height: "50px" }} className="container">
      {props.alert && <div style={{ background: "#E6E6E6", color: "#283645" }} className="fs-6 alert" role="alert">
        <strong>{props.alert} : </strong>
        <span>{props.message}</span>
      </div>}
    </div>
  )
}

export default Alert
