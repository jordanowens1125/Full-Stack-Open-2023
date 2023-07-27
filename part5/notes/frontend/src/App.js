import "./App.css";
import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
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
        // setNotes(notes.filter((n) => n.id !== id));
      });
  };
  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    };

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote("");
      })
      .catch((error) => {
        setErrorMessage(`An error has occurred: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        // setNotes(notes.filter((n) => n.id !== id));
      });
  };

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
        // setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logOut = () => {
    setUser(null);
    noteService.setToken(null);
    window.localStorage.removeItem("loggedNoteappUser");
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
        placeholder="a new note..."
      />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
          <button onClick={()=>logOut()}>Log Out</button>
        </div>
      )}

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

      <Footer />
    </div>
  );
}

export default App;
