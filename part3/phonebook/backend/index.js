const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const Person = require("./models/person");

morgan.token("id", function getId(req) {
  return req.id;
});

morgan.token("body", function getBody(req) {
  if (Object.keys(req.body).length !== 0) {
    return JSON.stringify(req.body);
  }
  return null;
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },
// ];

app.get("/", (req, res) => {
  res.send(
    "<div><h1>Welcome to the phonebook server!</h1><a href='/info'>Info</a></div>"
  );
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> ` + `<p>${date}</p>`
  );
});

app.get("/api/persons", async (req, res) => {
  Person.find({}).then((result) => res.json(result));
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name) {
    return res.status(400).json({
      error: "Name missing",
    });
  }

  if (!number) {
    return res.status(400).json({
      error: "Number missing",
    });
  }

  Person.findOne({ name: name }).then((result) => {
    if (result) {
      return res.status(400).json({
        error: "Name already in use",
      });
    } else {
      Person.create(req.body).then((newPerson) =>
        res.send(newPerson)
      );
    }
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => res.json(person));
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id).then((person) => res.json(person));
});

app.put("/api/persons/:id", (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body).then((result) => res.json(result))
});

app.listen(PORT);
