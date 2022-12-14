import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import NoteContext from '../context/notes/NoteContext'
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const context = useContext(NoteContext)
  const { notes, getAllNotes, editNote } = context
  
  
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes()
    }
    else{
      navigate('/Login')
    }
    //eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  
  const refClose = useRef(null)
  
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
 
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  


  const handleOnClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success")
  }


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="form-group col-md-3 mb-3">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />

                </div>
                <div className="form-group col-md-3 mb-3">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label htmlFor="tag">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleOnClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>

        <h2> Your notes</h2>
        <div className="container">
          {notes.length=== 0 && "No Notes to Display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
