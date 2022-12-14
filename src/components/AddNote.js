import React,{ useContext,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'


const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context

    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleOnClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added Successfully","success")
    } 

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                        
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" rows="3" name="description" value={note.description} onChange={onChange} minLength={5} required></textarea>

                        {/* <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required /> */}
                    </div>
                    
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
                    </div>
                    
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNote
