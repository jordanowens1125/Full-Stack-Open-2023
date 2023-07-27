const Blog = require("../models/blog");
const User = require("../models/user");

const demoUserID = async () => {
  const users = await User.find({});
  return users[0].id;
};

const initialUsers = [
  {
    username: "Demo User",
    name: "Mikey Lacey",
    passwordHash: process.env.passwordOne,
  },
  {
    username: "Demo User 2",
    name: "Mikey Lacey 2",
    passwordHash: process.env.passwordTwo,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Demo Blog",
    author: "64c15b272782b443ec0dcaf7",
    url: "https://www.youtube.com/watch?v=4FhsjQ2xess&t=650s",
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const initialBlogs = [
  {
    title: "Demo Test",
    author: demoUserID,
    url: "https://www.youtube.com/watch?v=-ZWwmVDQ20Q",
  },
  {
    title: "Demo Blog",
    author: demoUserID,
    url: "https://www.youtube.com/watch?v=-ZWwmVDQ20Q",
  },
];

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers,
  demoUserID,
};
