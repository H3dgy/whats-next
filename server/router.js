const express = require('express');
const router = express.Router();
const showsController = require('./controllers/showsController.js');
const usersController = require('./controllers/usersController');
const trackingController = require('./controllers/trackingController');

router
  .get('/recommended', showsController.recommended)
  .post('/shows/search', showsController.search)
  .get('/shows/:id', showsController.get)
  .post('/user', usersController.create)
  .get('/user/:id', usersController.get)
  .post('/user/:id/status', trackingController.status)
  .post('/user/:id/rate', trackingController.rate)
  .post('/user/:id/review', trackingController.review)

module.exports = router;
