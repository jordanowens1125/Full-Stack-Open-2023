const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany();
  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe("A new user can be created with a valid username and email", () => {
  test("a valid user can be created", async () => {
    const newUser = {
      username: "Who knows",
      name: "Mikey Bogus",
      password: process.env.passwordOne,
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);

    const names = usersAtEnd.map((n) => n.name);
    expect(names).toContain("Mikey Bogus");
  });
});

describe("A user cannot be created without a username and or password", () => {
  test("A user without a passwordhash cannot be created", async () => {
    const newUser = {
      username: "Who knows",
      name: "Mikey Bogus",
    };

    await api.post("/api/users").send(newUser).expect(401);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);

    const names = usersAtEnd.map((n) => n.name);
    expect(names).not.toContain("Mikey Bogus");
  });
  test("A user without a username cannot be created", async () => {
    const newUser = {
      name: "Mikey Bogus",
      passwordhash: process.env.passwordOne,
    };

    await api.post("/api/users").send(newUser).expect(401);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);

    const names = usersAtEnd.map((n) => n.name);
    expect(names).not.toContain("Mikey Bogus");
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
