const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");

app.use(express.json());

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

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

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

app.get("/api/persons", (req, res) => {
  res.json(persons);
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

  const person = persons.find((person) => person.name === name);

  if (person) {
    return res.status(400).json({
      error: "Name already in use",
    });
  }

  const id = Math.floor(Math.random() * 5000);
  let newPerson = {
    name,
    number,
    id,
  };
  persons = persons.concat(newPerson);
  res.send(newPerson);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  }
  res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(200);
});

app.listen(PORT);
