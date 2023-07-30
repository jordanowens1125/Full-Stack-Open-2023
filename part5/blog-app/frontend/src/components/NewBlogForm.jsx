import { useState } from "react";
import blogService from "../services/blog";
import Togglable from "./Toggleable";

const NewBlogForm = ({ blogs, setBlogs, setNotification, setSuccess }) => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [author, setAuthor] = useState("");

  const creatBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogService.create({
        title,
        url,
        author,
      });
      setAuthor("");
      setNotification(
        `A new blog ${title} by ${author || ""} has been created!`
      );
      setSuccess(true);
      setTitle("");
      setURL("");
      setBlogs([...blogs, newBlog]);
    } catch (error) {
      setNotification(error.response.data.error);
      setSuccess(false);
    }
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
          <button type="submit">Create Blog</button>
        </form>
      </Togglable>
    </>
  );
};

export default NewBlogForm;
