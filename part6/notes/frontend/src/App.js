import "./App.css";
import { useSelector } from "react-redux";
import NewNoteForm from "./components/NewNoteForm";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="App">
      <h1>Notes</h1>
      <NewNoteForm />

      <Notes />
    </div>
  );
}

export default App;
