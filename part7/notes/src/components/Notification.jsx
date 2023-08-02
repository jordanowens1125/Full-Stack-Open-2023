import { Alert } from "react-bootstrap";
const Notification = ({ message}) => {
  if (!message) {
    return null;
  }
  return (
    <div >
      {message && <Alert variant="success">{message}</Alert>}
    </div>
  );
};

export default Notification;
