import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [hide, setHide] = useState(true);
  return (
    <div className="blog">
      {blog.title} {blog?.author || "error"}{" "}
      <button onClick={() => setHide(!hide)}>
        {hide ? <>View</> : <>Hide</>}
      </button>
      {!hide && (
        <>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <p>{blog?.user?.username || "error"}</p>
          <button onClick={handleLike}>Like</button>
          {user.username === blog?.user?.username && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
