const mongoose = require("mongoose");

const comentSchema = mongoose.Schema({
  text: { type: String, required: true },
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  likes: { type: Number, default: 0 },
});

comentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Comment", comentSchema);
