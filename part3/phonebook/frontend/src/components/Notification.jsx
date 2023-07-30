const Notification = ({ message, success, setMessage }) => {
  if (message === null || message === "") {
    return null;
  }
  setTimeout(() => {
    setMessage(null);
  }, 5000);
  return <div className={success ? "success" : "error"}>{message}</div>;
};

export default Notification;
