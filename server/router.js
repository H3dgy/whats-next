const express = require('express');
const router = express.Router();
const showsController = require('./controllers/showsController.js');
const usersController = require('./controllers/usersController');

router
  .get('/recommended', showsController.recommended)
  .get('/shows/:showId', showsController.get)
  .post('/shows/:showId/seen', showsController.markAsSeen)
  .post('/shows/:showId/toSee', showsController.markToSee)
  .get('/user', usersController.get);

module.exports = router;
