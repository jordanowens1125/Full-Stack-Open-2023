import { useState, useEffect } from "react";
import Note from "./Note";
import noteService from "../services/notes";

const Notes = ({ notes, setNotes, setErrorMessage }) => {
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const deleteNote = (id) => {
    noteService
      .deleteNote(id)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => {
        setErrorMessage(`An error has occurred: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(`An error has occurred: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };
  return (
    <>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={deleteNote}
          />
        ))}
      </ul>
    </>
  );
};

export default Notes;
