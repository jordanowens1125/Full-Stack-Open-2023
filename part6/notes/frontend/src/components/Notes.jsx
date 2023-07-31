 import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Notes = ({ setErrorMessage }) => {

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  const Note = ({ note, handleClick }) => {
    return (
      <li onClick={handleClick}>
        {note.content}
        <strong> {note.important ? "important" : ""}</strong>
      </li>
    );
  };
  
  return (
    <>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => dispatch(toggleImportanceOf(note.id))}
          />
        ))}
      </ul>
    </>
  );
};

export default Notes;
