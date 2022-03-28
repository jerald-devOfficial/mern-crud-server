module.exports = app => {
    const libraries = require("../controllers/library.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", libraries.create);
  
    // Retrieve all Tutorials
    router.get("/", libraries.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", libraries.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", libraries.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", libraries.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", libraries.delete);
  
    // Create a new Tutorial
    router.delete("/", libraries.deleteAll);
  
    app.use("/api/libraries", router);
  };