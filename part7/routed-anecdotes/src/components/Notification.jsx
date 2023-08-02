import React, { useEffect } from "react";

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {}, [notification]);

  if (!notification) {
    return null;
  }

  if (notification) {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }
  return <div>{notification}</div>;
};

export default Notification;
