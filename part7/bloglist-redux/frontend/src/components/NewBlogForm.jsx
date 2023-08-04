import { useState } from "react";
import Togglable from "./Toggleable";
import { useDispatch } from "react-redux";
import { addNewBlog } from "../reducers/blogsReducer";

const NewBlogForm = () => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const creatBlog = async (e) => {
    e.preventDefault();
    dispatch(addNewBlog({ title, author, url }));
    setAuthor("");
    setTitle("");
    setURL("");
  };

  return (
    <>
      <Togglable buttonLabel="New Blog">
        <form onSubmit={creatBlog}>
          <label>Blog Title:</label>
          <input
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            id="title"
          />

          <label>URL:</label>
          <input
            placeholder="URL"
            value={url}
            onChange={(e) => setURL(e.currentTarget.value)}
            id="url"
          />

          <label>Author:</label>
          <input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.currentTarget.value)}
            id="author"
          />
          <button type="submit" id="submit-blog-button">
            Create Blog
          </button>
        </form>
      </Togglable>
    </>
  );
};

export default NewBlogForm;
