import { useState, useRef } from "react";
import Togglable from "./Togglable";

const NewNoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");
  const noteFormRef = useRef();
  const addNote = (event) => {
    noteFormRef.current.toggleVisibility();
    event.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });

    setNewNote("");
  };

  return (
    <Togglable buttonLabel="Create a new note" ref={noteFormRef}>
      <form onSubmit={addNote} className="formDiv">
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          inputLabel="new note input"
          type="text"
          placeholder="new-note-content"
          aria-label="new-note-input"
          id="note-input"
        />
        <button type="submit">save</button>
      </form>
    </Togglable>
  );
};

export default NewNoteForm;
