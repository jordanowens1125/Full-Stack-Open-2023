const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
app.use(cors());
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

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
