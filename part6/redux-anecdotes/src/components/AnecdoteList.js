import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });
  const dispatch = useDispatch();

  const handleAnecdote = (anecdote) => {
    dispatch({
      type: "anecdotes/VoteForAnecdote",
      payload: anecdote.id,
    });
    dispatch({
      type: "notification/setNotification",
      payload: `You liked "${anecdote.content}"`,
    });
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
