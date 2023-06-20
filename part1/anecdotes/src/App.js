import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Header = ({ title }) => <h1>{title}</h1>;

const Anecdote = ({ text, count }) => (
  <div>
    <p>{text}</p>
    <p>has {count} votes</p>
  </div>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votesArr, setVotesArr] = useState(new Array(anecdotes.length).fill(0));
  const generateRandomNumber = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  const voteForAnecdote = () => {
    const copy = [...votesArr];
    copy[selected] += 1;
    setVotesArr(copy);
  };

  const getMostVotesIndex = () => {
    let max = votesArr[0];
    let maxIndex = 0;

    for (let i = 1; i < votesArr.length; i++) {
      if (votesArr[i] > max) {
        maxIndex = i;
        max = votesArr[i];
      }
    }
    return maxIndex;
  };
  return (
    <div>
      <Header title="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} count={votesArr[selected]} />
      <Button handleClick={voteForAnecdote} text="vote" />
      <Button handleClick={generateRandomNumber} text="next anecdote" />
      <Header title="Anecdote with most votes" />
      <Anecdote
        text={anecdotes[getMostVotesIndex()]}
        count={votesArr[getMostVotesIndex()]}
      />
    </div>
  );
};
export default App;
