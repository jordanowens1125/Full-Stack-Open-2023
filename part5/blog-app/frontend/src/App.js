import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blog";
import loginService from "./services/login";
import Blogs from "./components/Blogs";

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
        setSuccess(null);
      }, 5000);
    }
  }, [notification]);

  useEffect(() => {
    if (user) {
      try {
        blogService
          .getAll()
          .then((initialBlogs) => {
            setBlogs(initialBlogs);
          })
          .catch(() => logOut());
      } catch (error) {
        console.log(123);
        setNotification(`An error has occurred: ${error.message}`);
        setSuccess(false);
        logOut();
      }
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification(null);
      setSuccess(null);
    } catch (error) {
      setNotification(error.response.data.error);
      setSuccess(false);
    }
  };

  return (
    <div className="App">
      <h1>Blog App</h1>
      <Notification message={notification} success={success} />
      {user ? (
        <>
          {user.username} is logged in!
          <button onClick={logOut}>Log Out</button>
          <NewBlogForm
            setBlogs={setBlogs}
            blogs={blogs}
            setNotification={setNotification}
            setSuccess={setSuccess}
          />
          <Blogs blogs={blogs} setBlogs={setBlogs} user={user} />
        </>
      ) : (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
