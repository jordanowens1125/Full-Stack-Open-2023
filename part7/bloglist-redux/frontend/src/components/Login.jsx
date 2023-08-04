import Togglable from "./Toggleable";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(username, password));
      setUsername("");
      setPassword("");
    } catch (error) {
      // setNotification(error.response.data.error);
      // setSuccess(false);
    }
  };

  const setDemo = () => {
    setPassword(import.meta.env.VITE_PASSWORD);
    setUsername(import.meta.env.VITE_USERNAME);
  };

  return (
    <Togglable buttonLabel="Login">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Username: </label>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
          value={username}
          id="Username"
        />
        <label>Password: </label>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          id="Password"
        />
        <button type="submit" id="login-button">
          Login
        </button>
        <button type="button" onClick={setDemo}>
          Set Demo Login
        </button>
      </form>
    </Togglable>
  );
};
export default Login;
