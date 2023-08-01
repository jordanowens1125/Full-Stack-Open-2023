import { useSelector, useDispatch } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  if (notification) {
    setTimeout(() => {
      dispatch({
        type: "notification/clearNotification",
      });
    }, 5000);
  }
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification && notification}</div>;
};

export default Notification;
