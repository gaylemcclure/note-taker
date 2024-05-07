const note = require('express').Router();
const fs = require("fs");
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the feedback
note.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

);

// POST Route for submitting feedback
note.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text, id } = req.body;

  // If all the required properties are present
  if (title && text && id) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: 'success',
      body: newNote,
    };
    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = note;
