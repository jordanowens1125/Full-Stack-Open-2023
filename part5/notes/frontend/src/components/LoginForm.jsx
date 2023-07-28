import { useState } from "react";
import loginService from "../services/login";
import noteService from "../services/notes";
import Togglable from "./Togglable";

const LoginForm = ({ setErrorMessage, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const setDemoCredentials = () => {
    setPassword(process.env.REACT_APP_DEMO_PASSWORD);
    setUsername(process.env.REACT_APP_DEMO_USERNAME);
  };
  return (
    <Togglable buttonLabel="Login">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label htmlFor="">Username:</label>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
          value={username}
          id="Username"
        />
        <label htmlFor="">Password:</label>
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
          type="password"
          id="Password"
        />
        <button type="button" onClick={setDemoCredentials}>
          Set Demo User Credentials
        </button>
        <button type="submit" id="login-button">
          Log In
        </button>
      </form>
    </Togglable>
  );
};

export default LoginForm;
