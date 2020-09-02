const express = require("express");
const router = express.Router();

// # destructures the Instructor and Apprentice model, giving us CRUD access to their corresponding tables
const { Instructor, Apprentice } = require("../models");

// # gets JSON of all instructors and any included apprentices
router.get("/", (req, res) => {
  Instructor.findAll({
    include: [Apprentice]
  })
    .then(instructors => {
      res.status(200).json(instructors);
    })
    .catch(err => {
      console.log("Error in instructor get all:", err);
      res.status(500).send(err);
    });
});

// # gets JSON for one instructor and any included apprentices based on matching id
router.get("/:id", (req, res) => {
  Instructor.findOne({
    where: {
      id: req.params.id
    },
    include: [Apprentice],
  })
    .then(instructor => {
      res.status(200).json(instructor);
    })
    .catch(err => {
      console.log("Error in instructor get by id:", err);
      res.status(500).send(err);
    });
});

// # inserts a new instructor
router.post("/", (req, res) => {
  Instructor.create(req.body)
    .then(instructor => {
      res.status(200).json({ insertId: instructor.id })
    })
    .catch(err => {
      console.log("Error in instructor post:", err);
      res.status(500).send(err);
    });
});

// # updates an instructor based on matching id
router.put("/:id", (req, res) => {
  Instructor.update(
    // # note how in a .update, we typically pass in two args: the update data and then an object that contains the 'where'
    req.body, 
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(numChanged => {
      res.status(200).json({ changedRows: numChanged[0] });
    })
    .catch(err => {
      console.log("Error in instructor post:", err);
      res.status(500).send(err);
    });
});

// # deletes an instructor based on matching id
router.delete("/:id", (req, res) => {
  Instructor.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(wasDeleted => {
      res.status(200).json({ deleted: wasDeleted !== 0 });
    })
    .catch(err => {
      console.log("Error in instructor delete:", err);
      res.status(500).send(err);
    });
});


module.exports = router;