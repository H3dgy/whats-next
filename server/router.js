const express = require('express');
const router = express.Router();
const showsController = require('./controllers/showsController.js');
const usersController = require('./controllers/usersController');

router
  .get('/recommended', showsController.recommended)
  .post('/shows/search', showsController.search)
  .get('/shows/:showId', showsController.get)
  .get('/user', usersController.get)
  .post('/user/:showId/seen', usersController.addSeen)
  .post('/user/:showId/toSee', usersController.addToSee)
  .delete('/user/:showId/seen', usersController.removeSeen)
  .delete('/user/:showId/toSee', usersController.removeToSee)
  .post('/user/:showId/rate', usersController.rate);

module.exports = router;
