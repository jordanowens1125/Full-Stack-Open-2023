import Togglable from "./Toggleable";
import PropTypes from "prop-types";

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  const setDemo = () => {
    setPassword(process.env.REACT_APP_PASSWORD);
    setUsername(process.env.REACT_APP_USERNAME);
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

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default Login;
