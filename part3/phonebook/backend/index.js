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

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send(
    "<div><h1>Welcome to the phonebook server!</h1><a href='/info'>Info</a></div>"
  );
});

app.get("/info", async (req, res) => {
  const date = new Date();
  const persons = await Person.find({});
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> ` + `<p>${date}</p>`
  );
});

app.use('/api/persons', require('./routes/persons'))


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT);
