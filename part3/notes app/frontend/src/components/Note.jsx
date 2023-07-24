const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={() => deleteNote(note.id)}>Delete</button>
    </li>
  );
};

export default Note;
