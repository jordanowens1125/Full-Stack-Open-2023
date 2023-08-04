import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const { message, success } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (message) {
        dispatch(clearNotification());
      }
    }, 5000);
  }, [message, dispatch]);

  if (!message) {
    return null;
  }

  return (
    <>
      {message && (
        <div className={success ? "success" : "error"}>{message}</div>
      )}
    </>
  );
};

export default Notification;
