import "./App.css";
import { useEffect } from "react";
import NewNoteForm from "./components/NewNoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { initializeNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
 useEffect(() => {
   dispatch(initializeNotes());
 }, [dispatch]); 
  
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
