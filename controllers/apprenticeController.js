const express = require("express");
const router = express.Router();

// # destructures the Instructor and Apprentice model, giving us CRUD access to their corresponding tables
const { Instructor, Apprentice } = require("../models");

// # gets JSON of all apprentice and their corresponding instructor
router.get("/", (req, res) => {
  Apprentice.findAll({
    include: [Instructor]
  })
    .then(apprentices => {
      res.status(200).json(apprentices);
    })
    .catch(err => {
      console.log("Error in apprentice get all:", err);
      res.status(500).send(err);
    });
});

// # gets JSON for one apprentice and their corresponding instructor based on matching id
router.get("/:id", (req, res) => {
  Apprentice.findOne({
    where: {
      id: req.params.id
    },
    include: [Instructor],
  })
    .then(apprentice => {
      res.status(200).json(apprentice);
    })
    .catch(err => {
      console.log("Error in apprentice get by id:", err);
      res.status(500).send(err);
    });
});

// # inserts a new apprentice
router.post("/", (req, res) => {
  Apprentice.create(req.body)
    .then(apprentice => {
      res.status(200).json({ insertId: apprentice.id })
    })
    .catch(err => {
      console.log("Error in apprentice post:", err);
      res.status(500).send(err);
    });
});

// # updates an apprentice based on matching id
router.put("/:id", (req, res) => {
  Apprentice.update(
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
      console.log("Error in apprentice post:", err);
      res.status(500).send(err);
    });
});

// # deletes an apprentice based on matching id
router.delete("/:id", (req, res) => {
  Apprentice.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(wasDeleted => {
      res.status(200).json({ deleted: wasDeleted !== 0 });
    })
    .catch(err => {
      console.log("Error in apprentice delete:", err);
      res.status(500).send(err);
    });
});


module.exports = router;