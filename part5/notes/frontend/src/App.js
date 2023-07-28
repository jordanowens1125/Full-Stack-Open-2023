import "./App.css";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import NewNoteForm from "./components/NewNoteForm";
import Notes from "./components/Notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      noteService.getAll().then((initialNotes) => {
        setNotes(initialNotes);
      });
    } catch (error) {
      setErrorMessage(`An error has occurred: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
  
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const logOut = () => {
    setUser(null);
    noteService.setToken(null);
    window.localStorage.removeItem("loggedNoteappUser");
  };


  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm setErrorMessage={setErrorMessage} setUser={setUser} />
      ) : (
        <div>
          <p>{user.name} is logged in</p>
          <NewNoteForm createNote={addNote} />
          <button onClick={() => logOut()}>Log Out</button>
        </div>
      )}

      <Notes
        notes={notes}
        setErrorMessage={setErrorMessage}
        setNotes={setNotes}
      />
      <Footer />
    </div>
  );
}

export default App;
