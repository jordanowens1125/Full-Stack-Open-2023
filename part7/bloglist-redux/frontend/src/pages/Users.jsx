import { useSelector } from "react-redux";
const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h2>Users</h2>
      {/* {users.map((user) => (
        <div>{user.name}</div>
      ))} */}
    </div>
  );
};

export default Users;
