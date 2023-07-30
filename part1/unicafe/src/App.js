import { useState } from "react";

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const StatisticLine = ({ name, val }) => (
  <tr>
    <td>{name} </td>
    <td>{val}</td>
  </tr>
);

const Header = ({ title }) => <h1>{title}</h1>;

const Statistics = ({
  getTotal,
  good,
  neutral,
  bad,
  getAverage,
  getPositive,
}) => {
  if (getTotal() === 0) return <div>No feedback given</div>;
  return (
    <table>
      <tbody>
        <StatisticLine name={"good"} val={good} />
        <StatisticLine name={"neutral"} val={neutral} />
        <StatisticLine name={"bad"} val={bad} />
        <StatisticLine name={"all"} val={getTotal()} />
        <StatisticLine name={"average"} val={getAverage()} />
        <StatisticLine name={"positive"} val={getPositive()} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getTotal = () => good + bad + neutral;
  const getAverage = () => (good - bad) / getTotal();
  const getPositive = () => `${(good / getTotal()) * 100} %`;
  return (
    <div>
      <Header title={"give feedback"} />
      <Button name={"good"} handleClick={() => setGood(good + 1)} />
      <Button name={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      <Button name={"bad"} handleClick={() => setBad(bad + 1)} />

      <Header title={"statistics"} />

      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        getAverage={getAverage}
        getTotal={getTotal}
        getPositive={getPositive}
      />
    </div>
  );
};

export default App;
