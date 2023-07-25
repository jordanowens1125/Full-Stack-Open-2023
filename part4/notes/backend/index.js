const app = require("./app"); // the actual Express application
const config = require("./utils/config");
const logger = require("./utils/logger");

const mongoose = require("mongoose");
const supertest = require("supertest");
const api = supertest(app);

const Note = require("./models/note");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

// beforeEach(async () => {
//   await Note.deleteMany({});
//   let noteObject = new Note(initialNotes[0]);
//   await noteObject.save();
//   noteObject = new Note(initialNotes[1]);
//   await noteObject.save();
// });

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
