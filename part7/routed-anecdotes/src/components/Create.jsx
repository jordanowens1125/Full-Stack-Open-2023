import { useState } from "react";

const Create = ({ setAnecdotes, anecdotes, setNotification }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

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
    setNotification(`A new anecdote${content} has been created!`)
    setAuthor("");
    setContent("");
    setInfo("");
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default Create;
