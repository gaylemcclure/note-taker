const router = require('express').Router();

// Import the router for notes routing
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;
