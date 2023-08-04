import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.user);
  if (!user) {
    return null;
  }
  return <div>User</div>;
};

export default User;
