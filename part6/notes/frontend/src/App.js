import "./App.css";
import NewNoteForm from "./components/NewNoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
function App() {
  return (
    <div className="App">
      <h1>Notes</h1>
      <NewNoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default App;
