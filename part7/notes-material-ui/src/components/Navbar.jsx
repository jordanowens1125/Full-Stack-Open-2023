import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, IconButton } from "@mui/material";

const padding = {
  padding: 5,
};

const NavbarComponent = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/notes">
          Notes
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        {user ? <em>{user} logged in</em> : <Button color="inherit" component={Link} to="/login">login</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
