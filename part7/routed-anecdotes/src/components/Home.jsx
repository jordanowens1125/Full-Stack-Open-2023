import { Link } from "react-router-dom";

const Home = ({ anecdotes }) => {
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </div>
  );
};

export default Home;
