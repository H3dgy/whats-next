const express = require('express');
const router = express.Router();
const showsController = require('./controllers/showsController.js');

router
  .get('/recommended', showsController.recommended)
  .get('/shows/:showId', showsController.get)
  .post('/shows/:showId/seen', showsController.markAsSeen)
  .post('/shows/:showId/toSee', showsController.markToSee);

module.exports = router;
