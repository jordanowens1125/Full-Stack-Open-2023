import { useEffect, useState } from "react";
import usersAPI from "../services/users";

const User = () => {
  const [user, setUser] = useState(null);
  const id = "64c6df1f9b6f5c9b8b2c9f7f";
  useEffect(() => {
    usersAPI.getUser(id).then((response) => setUser(response));
  }, []);
  if (!user) {
    return <div>No user found</div>;
  }
  return (
    <div>
      <h3>{user.name}</h3>
      <p>Added Blogs</p>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
};

export default User;
