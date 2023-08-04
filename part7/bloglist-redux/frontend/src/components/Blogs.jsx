import Blog from "./Blog";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBlog, updateBlogState } from "../reducers/blogsReducer";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {}, [blogs]);
  const handleLike = async (blog) => {
    try {
      dispatch(updateBlogState(blog));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirm) {
      try {
        dispatch(removeBlog(blog.id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sortBlogs = (blogs) => {
    let result = [...blogs].sort(function (a, b) {
      return parseFloat(b.likes) - parseFloat(a.likes);
    });
    return result;
  };

  const sortedList = sortBlogs(blogs);
  return (
    <>
      {sortedList.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleDelete={() => handleDelete(blog)}
          user={user}
        />
      ))}
    </>
  );
};

export default Blogs;
