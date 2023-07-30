import Blog from "./Blog";
import blogService from "../services/blog";
import { useEffect } from "react";
const Blogs = ({ blogs, setBlogs, user }) => {
  useEffect(() => {}, [blogs]);

  const handleLike = async (blog) => {
    const id = blog.id;
    try {
      blogService.update(id, {
        ...blog,
        user: blog?.user?.id || null,
        likes: blog.likes + 1,
      });
      setBlogs(
        blogs.map((blog) =>
          blog.id === id
            ? {
                ...blog,
                likes: blog.likes + 1,
              }
            : blog
        )
      );
    } catch (error) {}
  };

  const handleDelete = (blog) => {
    const id = blog.id;
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirm) {
      try {
        blogService.deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } catch (error) {}
    }
  };

  const sortedBlogs = (blogs) => {
    let result = blogs.sort(function (a, b) {
      return parseFloat(b.likes) - parseFloat(a.likes);
    });
    return result;
  };

  const sortedList = sortedBlogs(blogs)
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
