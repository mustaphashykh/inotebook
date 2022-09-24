import React from "react"
import AddNote from './AddNotes'
import NavbarOptions from "./NavbarOptions"
import NotesContainer from './NotesContainer'
function Home() {
  return (
    <div className="container">
      <div>
        <NavbarOptions />
      </div>
      <div className="row">
        <div className="col-md-4">
          <AddNote />
        </div>
        <div className="col-md-8">
          <NotesContainer />
        </div>
      </div>
    </div>
  )
}

export default Home
