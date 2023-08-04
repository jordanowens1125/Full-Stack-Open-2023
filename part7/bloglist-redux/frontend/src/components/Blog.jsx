import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [hide, setHide] = useState(true);
  return (
    <div className="blog">
      <Link to={`/blogs/$${blog.id}`}>Title: {blog.title}</Link>

      <p>Author: {blog?.author || "error"} </p>

      <button onClick={() => setHide(!hide)}>
        {hide ? <>View</> : <>Hide</>}
      </button>
      {!hide && (
        <>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <p>{blog?.user?.username || "error"}</p>
          <button onClick={handleLike}>Like</button>
          {user && (
            <>
              {user.username === blog?.user?.username && (
                <button onClick={handleDelete}>Delete</button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
