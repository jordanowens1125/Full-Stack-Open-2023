const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Demo Test",
    author: "Mikey Lacey",
    url: "https://www.youtube.com/watch?v=-ZWwmVDQ20Q",
  },
  {
    title: "Demo Blog",
    author: "Mikey Lacey",
    url: "https://www.youtube.com/watch?v=-ZWwmVDQ20Q",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Demo Blog",
    author: "Mikey Lacey",
    url: "https://www.youtube.com/watch?v=4FhsjQ2xess&t=650s",
  },);
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
