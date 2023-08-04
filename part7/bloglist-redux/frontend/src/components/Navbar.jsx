import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";
import { logOutUser } from "../reducers/userReducer";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <nav>
      <Link to={"/"}>Blogs</Link>
      <Link to={"/users"}>Users</Link>
      {user ? (
        <>
          {user.username} is logged in!
          <button onClick={() => dispatch(logOutUser())}>Log Out</button>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
      <h1>Blog App</h1>
    </nav>
  );
};

export default Navbar;
