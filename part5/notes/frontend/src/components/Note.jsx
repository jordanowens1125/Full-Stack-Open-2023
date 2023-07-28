const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={toggleImportance} className="importance-toggle">
        {label}
      </button>
      {/* <button onClick={() => deleteNote(note.id)}>Delete</button> */}
    </li>
  );
};

export default Note;
