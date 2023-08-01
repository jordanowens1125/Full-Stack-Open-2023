import { useQuery, useMutation, useQueryClient } from "react-query";
import { getNotes, createNote, updateNote } from "./requests";
// import Notes from "./components/Notes";
import "./App.css";

function App() {
  const queryClient = useQueryClient();
  const result = useQuery("notes", getNotes, {
    refetchOnWindowFocus: false,
  });

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("notes");
      queryClient.setQueryData("notes", notes.concat(newNote));
    },
  });

  const notes = result.data;

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    newNoteMutation.mutate({ content, important: true });
  };

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: (updatedNote) => {
      const notes = queryClient.getQueryData("notes");
      const noteToChangeIndex = notes.findIndex(
        (note) => note.id === updatedNote.id
      );
      notes[noteToChangeIndex] = updatedNote;
      queryClient.setQueryData("notes", notes);
    },
  });

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <h1>Notes App</h1>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
}

export default App;
