import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/api";
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);

  // get all notes

  const getallnotes = async () => {
    // Api call for backend

    let url = `${host}/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    setnotes(json);
    console.log(json);

    console.log("fetching all notes ");
  };

  const addNote = async (title, description, tag) => {
    // Api call for backend

    let url = `${host}/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    console.log("Adding a new note");
    console.log(json);

    // change the frontend
    const note = json;


    setnotes(notes.concat(note));
  };
  const deleteNote = async (id) => {
    // Api call for backend
    let url = `${host}/notes/delete/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    console.log("deleting the note")
    const json = await response.json();
    console.log(json);

    // change the frontend
    console.log("delete node with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id != id;
    });
    setnotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    // Api call for backend
    let url = `${host}/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const jjson =await response.json();
    console.log(jjson);
    const newNotes = JSON.parse(JSON.stringify(notes));
    console.log(" new note " +newNotes);

    // change the frontend

    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id == id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(newNotes);
    setnotes(newNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getallnotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
