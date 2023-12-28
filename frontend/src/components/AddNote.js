import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({
      title: "",
      description: "",
      tag: "",
    });

    props.showAlert("Note created Successfully","success")
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h1 className="text-center  ">iNotebook</h1>

        <h2>Add Note </h2>

        <div className="container my-4">
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
            {/* <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div> */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
              disabled={note.title.length < 3 || note.description.length < 5}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
