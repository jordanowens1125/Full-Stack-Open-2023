const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  response.status(200).json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const result = await Blog.findByIdAndUpdate(id, request.body);
  response.status(200).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

module.exports = blogsRouter;
