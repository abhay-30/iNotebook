import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getallnotes, editNote } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getallnotes();
    }
    else{
      navigate("/login");
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
    _id:""
  });

  const updateNote = (note) => {
    setnote(note);
    ref.current.click();
    
  };

  const handleClick = (e) => {
    // e.preventDefault();
    console.log("updating the node");
    editNote(note._id, note.title,note.description,note.tag);
    props.showAlert("Note updated Successfully" ,"success");
    refClose.current.click();
     
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit your Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="emailHelp"
                    name="title"
                    onChange={onChange}
                    value={note.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={onChange}
                    value={note.description}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                    value={note.tag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.title.length<3 || note.description.length<5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    
      <div className="container">
        <h2>Your Notes </h2>
        <div className=" container row">
          {notes.length==0?"No Notes to show":notes.map((note) => {
            return (
              <Noteitem key={notes._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
            );
          }) }
          
         
        </div>
      </div>
    </>
  );
};

export default Notes;
