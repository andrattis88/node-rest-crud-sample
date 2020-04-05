/*
    ROUTES                  ACTION      DESCRIPTION

    api/tutorials           POST        Create a new Tutorial
    api/tutorials/:id       GET         Find Tutorial by ID
    api/tutorials           GET         Retrieves all Tutorials
    api/tutorials/published GET         Retrieves all published Tutorials
    api/tutorials/:id       PUT         Update Tutorial with given ID    
    api/tutorials/:id       DELETE      Delete Tutorial with given ID
    api/tutorials           DELETE      Delete all Tutorials
    
*/

module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);

    // Retrieves all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieves all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Find Tutorial by ID
    router.get("/:id", tutorials.findOne);

    // Update Tutorial with given ID
    router.put("/:id", tutorials.update);

    // Delete Tutorial with given ID
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};