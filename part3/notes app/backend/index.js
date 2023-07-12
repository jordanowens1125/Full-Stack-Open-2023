const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
const Note = require("./models/note");

app.use(cors());
app.use(express.json());
require("dotenv").config();
app.use(express.static("dist"));


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

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

const mongoose = require("mongoose");

// get notes
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

// new notes
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// update note
// app.put("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);

//   notes = notes.map((note) => {
//     if (note.id === id) {
//       return request.body;
//     }
//     return note;
//   });

//   let note = notes.find((note) => note.id === id);

//   if (!note) {
//     return response.status(404).end();
//   }

//   response.json(request.body);
// });

// // del notes
app.delete("/api/notes/:id", async (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
