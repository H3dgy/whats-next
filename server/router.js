const express = require('express');
const router = express.Router();
const showsController = require('./controllers/showsController.js');
const usersController = require('./controllers/usersController');

router
  .get('/recommended', showsController.recommended)
  .post('/shows/search', showsController.search)
  .get('/shows/:tmdbId', showsController.get)
  .get('/user', usersController.get)
  .post('/user/:tmdbId/status', usersController.status)
  .post('/user/:tmdbId/rate', usersController.rate);

module.exports = router;
