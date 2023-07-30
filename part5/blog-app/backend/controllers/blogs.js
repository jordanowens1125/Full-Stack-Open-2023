const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.status(200).json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  response.status(200).json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const user = request.user;
  console.log(user);
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: "Blog title and url are required",
    });
  }

  const blog = {
    title: request.body.title,
    url: request.body.url,
    author: request.body.author,
    user: user.id,
  };

  const result = await Blog.create(blog);
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  result.user = user;
  response.status(201).json(result);
});

blogsRouter.put("/:id", async (request, response) => {
  //const user = request.user;
  const id = request.params.id;
  const blog = await Blog.findById(id);
  await Blog.findByIdAndUpdate(id, request.body);
  response.status(200).json(blog);
  // if (blog.user.toString() === user.id.toString()) {

  // } else {
  //   response
  //     .status(401)
  //     .json({ error: "Blogs can only be edited by their respective author " });
  // }
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const user = request.user;
  const blog = await Blog.findById(id);
  console.log(blog.user);
  console.log(user.id);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } else {
    response.status(401).json({ error: "Blog can only be deleted by author " });
  }
});

module.exports = blogsRouter;
