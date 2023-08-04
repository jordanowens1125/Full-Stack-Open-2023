import { useState, useEffect } from "react";
import blogApi from "../services/blog";
import { useParams } from "react-router-dom";
import { createSuccess, createError } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    blogApi.getBlog(id).then((response) => setBlog(response));
  }, [id]);

  if (!blog) {
    return <div>No blog found</div>;
  }

  const createComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await blogApi.createComment(
        id,
        e.target.comment.value
      );
      setBlog({
        ...blog,
        comments: [...blog.comments, newComment],
      });
      e.target.comment.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const likeBlog = async () => {
    try {
      await blogApi.update({
        ...blog,
        likes: blog.likes + 1,
        comments: blog.comments.map((comment) => comment.id),
      });
      setBlog({
        ...blog,
        likes: blog.likes + 1,
      });
      dispatch(createSuccess(`You liked ${blog.title}`));
    } catch (error) {
      console.log(error);
      dispatch(createError(`Attempt to like ${blog.title} failed`));
    }
  };

  return (
    <div>
      <h3>{blog.title}</h3>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <p>Likes {blog.likes}</p>
      <button onClick={likeBlog}>Like</button>
      <p>Added by {blog.user.name}</p>
      <p>Comments</p>
      <form onSubmit={createComment}>
        <input type="text" name="comment" required />
        <button type="submit">Add Comment</button>
      </form>
      <div>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </div>
    </div>
  );
};

export default Blog;
