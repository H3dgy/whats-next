const express = require('express');
const router = express.Router();
const showsController = require('./controllers/showsController.js');
const usersController = require('./controllers/usersController');

router
  .get('/recommended', showsController.recommended)
  .post('/shows/search', showsController.search)
  .get('/shows/:id', showsController.get)
  .post('/user', usersController.create)
  .get('/user/:id', usersController.get)
  .post('/user/:id/status', usersController.status)
  .post('/user/:id/rate', usersController.rate);

module.exports = router;
