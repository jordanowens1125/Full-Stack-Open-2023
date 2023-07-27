const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

let token = "";

beforeAll(async () => {
  const result = await api.post("/api/login").send({
    username: "Misty Ricky",
    password: "salainen",
  });

  token = result.request.response._body.token;
});

beforeEach(async () => {
  const userID = await helper.demoUserID();
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, author: userID })
  );
  const blogArray = blogObjects.map((blog) => blog.save());
  await User.deleteMany({ username: { $ne: "Misty Ricky" } });
  const userObjects = helper.initialUsers.map((user) => new User(user));
  const userArray = userObjects.map((user) => user.save());

  await Promise.all([...blogArray, ...userArray]);
});

test("", () => {
  expect(1).toBe(1);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    url: "Only the world knows what going on",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const title = blogsAtEnd.map((n) => n.title);
  expect(title).toContain("async/await simplifies making async calls");
});

test("A blog with no likes defaults to 0", async () => {
  const currentUsers = await helper.usersInDb();
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: currentUsers[0].id,
    url: "Only the world knows what going on",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
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
  const currentUsers = await helper.usersInDb();
  const newBlog = {
    author: currentUsers[0].id,
    url: "Only the world knows what going on",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(400);
});

test("A blog without a url will return with a status code of 400", async () => {
  const currentUsers = await helper.usersInDb();
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: currentUsers[0].id,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(400);
});

describe("A blog is successfully deleted", () => {
  test("The first blog is deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    const blogssAtEnd = await helper.blogsInDb();

    expect(blogssAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    const titles = blogssAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("A blog is successfully updated", () => {
  test("The first blog was updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: "Johnny Cash Biography",
        url: "https://en.wikipedia.org/wiki/Johnny_Cash&sourceid=chrome&ie=UTF-8",
        likes: "1",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    const blogssAtEnd = await helper.blogsInDb();

    const titles = blogssAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToUpdate.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
