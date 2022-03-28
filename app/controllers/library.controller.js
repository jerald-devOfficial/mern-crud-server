const db = require("../models");
const Library = db.libraries;

// Create and Save a new Library
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Library
  const library = new Library({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Library in the database
  library
    .save(library)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Library."
      });
    });
};

// Retrieve all Libraries from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Library.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving libraries."
      });
    });
};

// Find a single Library with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Library.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Library with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Library with id=" + id });
    });
};

// Update a Library by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Library.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Library with id=${id}. Maybe Library was not found!`
        });
      } else res.send({ message: "Library was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Library with id=" + id
      });
    });
};

// Delete a Library with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Library.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Library with id=${id}. Maybe Library was not found!`
        });
      } else {
        res.send({
          message: "Library was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Library with id=" + id
      });
    });
};

// Delete all Libraries from the database.
exports.deleteAll = (req, res) => {
  Library.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Libraries were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all libraries."
      });
    });
};

// Find all published Libraries
exports.findAllPublished = (req, res) => {
  Library.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving libraries."
      });
    });
};