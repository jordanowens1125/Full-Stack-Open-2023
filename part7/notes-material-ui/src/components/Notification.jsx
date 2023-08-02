import { Alert } from "@mui/material";
const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  return <div>{message && <Alert severity="success">{message}</Alert>}</div>;
};

export default Notification;
