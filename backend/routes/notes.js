const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetechuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// route to fetch all notes of a user

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error.messsage);
    res.status(500).send("Internal Server error");
  }
});

// route to add notes to the data of a particular user

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      console.log(note);

      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.log(error.messsage);
      res.status(500).send("Internal Server error");
    }
  }
);

// route for updating the notes

router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      let newNote = {};

      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(404).send("Not Allowed");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.log(error.messsage);
      res.status(500).send("Internal Server error");
    }
  }
);

router.delete(
  "/delete/:id",
  fetchuser,

  async (req, res) => {
    try {
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(404).send("Not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ success: "Success your note  has been deleted", note: note });
    } catch (error) {
      console.log(error.messsage);
      res.status(500).send("Internal Server error");
    }
  }
);

module.exports = router;
