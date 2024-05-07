const note = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const idGenerator = require('../helpers/idGenerator');

// GET Route for retrieving all the feedback
note.get('/', (req, res) =>
  //call the ReadFile helper function
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

);

// POST Route for adding a new note
note.post('/', (req, res) => {
  //calling the id function
  const generatedId = idGenerator();
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Save object in a new variable
    const newNote = {
      title,
      text,
      id: generatedId
    };
    //call the appendFile helper function
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

//DELETE route
note.delete('/:id', (req, res) => {
  let notes = req.body;

  if (notes){
  let filterNotes = notes.filter((note) => note.id !== req.params.id)
  writeToFile("./db/db.json", filterNotes)
  const response = {
    status: 'success',
    body: filterNotes,
  };
  res.json(response);
}else {
  res.json('Error in posting feedback');
}
  


})
module.exports = note;
