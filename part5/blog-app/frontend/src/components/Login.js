const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <label>Username: </label>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.currentTarget.value)}
        value={username}
      />
      <label>Password: </label>
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
