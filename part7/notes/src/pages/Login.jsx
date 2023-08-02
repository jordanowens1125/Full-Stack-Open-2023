import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    onLogin("mluukkai");
    navigate("/");
  };

  return (
    <div>
      <div>
        <h2>login</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control type="text" name="username" />
            <Form.Label>password:</Form.Label>
            <Form.Control type="password" />
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Login;
