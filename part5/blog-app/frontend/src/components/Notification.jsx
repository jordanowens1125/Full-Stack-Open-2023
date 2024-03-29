import React from "react";

const Notification = ({ message, success }) => {
  return (
    <>
      {message && (
        <div className={success ? "success" : "error"}>{message}</div>
      )}
    </>
  );
};

export default Notification;
