import { useField } from "../hooks/useField";

const Create = ({ setAnecdotes, anecdotes, setNotification }) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const resetInputs = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const anecdote = {
      content,
      author,
      info,
      votes: 0,
      id: Math.round(Math.random() * 10000),
    };
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`A new anecdote${content} has been created!`);
    resetInputs();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={resetInputs}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Create;
