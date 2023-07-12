const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

require("dotenv").config();

const password = process.env.PASSWORD;

const url = `mongodb+srv://Main:${password}@rappers.n8q3hzf.mongodb.net/FSO-P3-phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "HTML is Easy",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });

// mongodb+srv://Main:<password>@rappers.n8q3hzf.mongodb.net/?retryWrites=true&w=majority
