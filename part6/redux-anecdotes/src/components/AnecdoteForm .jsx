import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    dispatch({
      type: "anecdotes/createAnecdote",
      payload: content,
    });
    dispatch({
      type: "notification/setNotification",
      payload: `You created Anecdote "${content}"`,
    });
    e.target.content.value = "";
  };

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="content" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
