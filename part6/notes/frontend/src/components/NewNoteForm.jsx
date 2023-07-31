import { useRef } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { createNote } from "..//reducers/noteReducer";

const NewNoteForm = () => {
  const dispatch = useDispatch();

  const noteFormRef = useRef();
  const addNote = (event) => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(createNote(content));
  };

  return (
    <Togglable buttonLabel="Create a new note" ref={noteFormRef}>
      <form onSubmit={addNote} className="formDiv">
        <input name="note" />
        <button type="submit">add</button>
      </form>
    </Togglable>
  );
};

export default NewNoteForm;
