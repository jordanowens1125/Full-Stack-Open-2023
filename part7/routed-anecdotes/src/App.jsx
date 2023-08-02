import "./App.css";
import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Create from "./components/Create";
import About from "./components/About";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

function App() {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");
  return (
    <>
      <h1>Software Anecdotes</h1>
      <li>
        <Link to="/">Anecdotes</Link>
      </li>
      <li>
        <Link to="/create">Create New</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <Notification notification={notification} setNotification={setNotification}/>
      <Routes>
        <Route path="/" element={<Home anecdotes={anecdotes} />} />
        <Route
          path="/create"
          element={
            <Create
              setAnecdotes={setAnecdotes}
              anecdotes={anecdotes}
              setNotification={setNotification}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
