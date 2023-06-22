import React from "react";

const Total = ({ parts }) => {
  const sum = parts.reduce((total, cur) => total + cur.exercises, 0);
  return (
    <p>
      <b>Total of {sum} exercises</b>
    </p>
  );
};

export default Total;
