const express = require('express');
const router = express.Router();
const showsController = require('./controllers/showsController.js');
const usersController = require('./controllers/usersController');

router
  .get('/recommended', showsController.recommended)
  .post('/shows/search', showsController.search)
  .get('/shows/:showId', showsController.get)
  .get('/user', usersController.get)
  .post('/user/:showId/status', usersController.status)
  .post('/user/:showId/rate', usersController.rate);

module.exports = router;
