import NewBlogForm from "../components/NewBlogForm";
import Blogs from "../components/Blogs";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      {user && (
        <>
          <NewBlogForm />
          <Blogs />
        </>
      )}
    </div>
  );
};

export default Home;
