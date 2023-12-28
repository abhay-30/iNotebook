import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const { note , updateNote} = props;
  const context = useContext(noteContext);
  const { deleteNote  } = context;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="container flex">
            <div className="d-flex">
              <div className=" card-title  flex-grow-1  fs-4 ">
                {note.title} 
              </div>
              <i className="fa-regular fa-pen-to-square   p-1 mx-.5"   onClick={() => {
                  updateNote(note);
                }}></i>
              <i
                className="fa-regular fa-trash-can   p-1  "
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Note deleted Successfully","success")
                  
                }}
              ></i>
            </div>
            <h5 className="card-title"> </h5>
          </div>
          <p className="card-text"> {note.description} </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
