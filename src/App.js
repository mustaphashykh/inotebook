import NavBar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import UpdateUser from './Components/UpdateUser'
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import LandingPage from "./Components/LandingPage";
import { NotesStates } from './Context/Notes/NotesState';
import { useState } from "react"
import ProfileImage from "./Components/ProfileImage";
import Alert from "./Components/Alert"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from "./Components/Profile";
import UploadProfileImage from "./Components/UpdateProfileImage";
import Setting from "./Components/Setting";
import ResetPassword from "./Components/ResetPassword";
const Host = "http://localhost:5000";
function App() {
  const [alert, setAlert] = useState(null)
  const [message, setMessage] = useState(null)
  const showAlert = (operation, message) => {
    setAlert(operation);
    setMessage(message);
  }
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState({})
  const getUser = async () => {
    const response = await fetch(`${Host}/user/getuser`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'is_logged_in': localStorage.getItem("is_logged_in")
      }
    });
    const jsoned_user = await response.json()
    setUser(jsoned_user.user);
  }
  const getNotes = async () => {
    const response = await fetch(`${Host}/notes/getallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'is_logged_in': localStorage.getItem("is_logged_in")
      }
    });
    const json_notes = await response.json();
    setNotes(json_notes.notes);
  }
  const AddNote = async (title, description, tag) => {
    await fetch(`${Host}/notes/addnotes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'is_logged_in': localStorage.getItem("is_logged_in")
      },
      body: JSON.stringify({ title: title, description: description, tag: tag })
    });
  }
  const updateNote = async (id, note) => {
    const { title, tag, description } = note;
    await fetch(`${Host}/notes//updatenotes/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'is_logged_in': localStorage.getItem("is_logged_in")
      },
      body: JSON.stringify({ title: title, description: description, tag: tag })
    });
  }
  const deleteNote = async (id) => {
    await fetch(`${Host}/notes/deletenotes/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'is_logged_in': localStorage.getItem("is_logged_in")
      }
    });
  }
  const upload_profile_image = async (formData) => {
    await fetch(`${Host}/user/upload_profile`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'is_logged_in': localStorage.getItem("is_logged_in")
      },
      body: formData
    });
    showAlert("Success", "Profile picture is uploaded successfully.")
  }
  const update_profile_image = async (formData) => {
    await fetch(`${Host}/user/update_profile_image`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'is_logged_in': localStorage.getItem("is_logged_in")
      },
      body: formData
    });
    showAlert("Success", "Profile picture is updated successfully.")
  }
  const Update_User_in_DB = async (f_name, l_name, username) => {
    await fetch(`${Host}/user/update_user`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'is_logged_in': localStorage.getItem("is_logged_in")
      },
      body: JSON.stringify({ f_name: f_name, l_name: l_name, username: username })
    });
  }
  const forgetPassword = async () => {
    await fetch(`${Host}/auth/forgetPassword`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'is_logged_in': localStorage.getItem("is_logged_in")
      }
    })
  }
  document.body.style.background = '#283645';
  document.body.style.height = '100vh';
  return (
    <>
      <NotesStates.Provider value={{ notes, AddNote, deleteNote, updateNote, Update_User_in_DB, forgetPassword, getNotes, user, setUser, getUser, showAlert, upload_profile_image, update_profile_image, setAlert, setMessage }}>
        <Router>
          <NavBar />
          <Alert alert={alert} message={message} />
          <Routes>
            <Route exact path="/" element={<LandingPage />}>
            </Route>
            <Route exact path="/home" element={<Home />}>
            </Route>
            <Route exact path="/UpdateProfileImage" element={<UploadProfileImage />}>
            </Route>
            <Route exact path="/about" element={<About />}>
            </Route>
            <Route exact path='/setting' element={<Setting />}>
            </Route>
            <Route exact path="/profile" element={<Profile />}>
            </Route>
            <Route exact path="/uploadImage" element={<ProfileImage />}>
            </Route>
            <Route exact path="/updateAccount" element={<UpdateUser />}>
            </Route>
            <Route exact path="/signup" element={<Signup />}>
            </Route>
            <Route exact path="/login" element={<Login />}>
            </Route>
            <Route exact path="/resetpassword/:token" element={<ResetPassword />}>
            </Route>
          </Routes>
        </Router>
      </NotesStates.Provider>
    </>
  );
}

export default App;