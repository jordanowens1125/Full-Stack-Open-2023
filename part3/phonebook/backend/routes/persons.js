const express = require("express");
const router = express.Router();
const Person = require("../models/person");

router.get("/", async (req, res, next) => {
  Person.find({})
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

router.get("/:id", async (req, res, next) => {
  await Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

router.post("/", (req, res, next) => {
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

  Person.findOne({ name: name })
    .then((result) => {
      if (result) {
        return res.status(400).json({
          error: "Name already in use",
        });
      } else {
        Person.create(req.body)
          .then((newPerson) => res.send(newPerson))
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

router.delete("/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

router.put("/:id", (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

module.exports = router;
