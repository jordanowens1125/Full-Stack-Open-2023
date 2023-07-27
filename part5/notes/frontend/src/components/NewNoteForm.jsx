import { useState, useRef } from "react";
import Togglable from "./Toggleable";

const NewNoteForm = ({ createNote}) => {
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
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </Togglable>
  );
};

export default NewNoteForm;
