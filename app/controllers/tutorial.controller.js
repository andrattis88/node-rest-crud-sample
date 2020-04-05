const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.sequelize.Op;

// Create
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message : "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const Tutorial = {
        title : req.body.title,
        description : req.body.description,
        published : req.body.published ? req.body.published : false
    };

    // Save Tutorial in the Database
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occured while creating the Tutorial."
            });
        });

};

// Find one 
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving Tutorial with id = " + id + "."
            });
        }); 
};

// Find All / Find All with given title
exports.findAll = (req, res) => {
    const title = req.query.title;

    var condition = title ? { title : { [Op.like] : `%${title}` } } : null;

    Tutorial.findAll({ where : condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving Tutorials."
            })
        });
};

// Find all published 
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where : { published : true }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message | "Some error occurred while retrieving Tutorials."
            });
        });
};



// Update 
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, { where : { id : id }})
        .then(num => {
            if (num == 1) {
                res.send({
                    message : "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message : `Cannot update Tutorial with id = ${id}. Maybe Tutorial was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Error updating Tutorial with id = " + id + "."
            });
        });
};

// Delete 
exports.delete  = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({where : { id : id }})
        .then(num => {
            if (num == 1) {
                res.send({
                    message : "Tutorial deleted successfully."
                });
            } else {
                res.send({
                    message : `Cannot delete Tutorial with id = ${id}. Maybe Tutorial was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Error deleting Tutorial with id = " + id + "."
            });
        });
};

// Delete all
exports.deleteAll = (req, res) => {
    Tutorial.destroy({ where : {}, truncate : false })
        .then(nums => {
            res.send({
                message : `${nums} Tutorials were deleted successfully.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while removing all Tutorials."
            });
        });
};
