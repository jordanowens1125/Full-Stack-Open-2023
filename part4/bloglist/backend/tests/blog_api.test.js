const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Who knows",
    url: "Only the world knows what going on",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const title = blogsAtEnd.map((n) => n.title);
  expect(title).toContain("async/await simplifies making async calls");
});

test("A blog with no likes defaults to 0", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Who knows",
    url: "Only the world knows what going on",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[2].likes).toBe(0);
});

test("Verify unique identifier property is id", async () => {
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd[0].id).toBeDefined();
  expect(blogsAtEnd[1].id).toBeDefined();
});


test("A blog without a title will return with a status code of 400", async () => {
   const newBlog = {
     author: "Who knows",
     url: "Only the world knows what going on",
   };

 await api
   .post("/api/blogs")
   .send(newBlog)
   .expect(400)
});

test("A blog without a url will return with a status code of 400", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Who knows",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
