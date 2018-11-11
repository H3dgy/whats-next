const usersController = {};
const helpers = require('./helpers');
const db = require('../models/index');

usersController.get = async (req, res) => {
  const user = await helpers.getUser(req.userId);
  res.status(200).send(user);
};

usersController.status = async (req, res) => {
  const tmdbId = +req.params.showId;
  const userId = +req.userId;
  const showId = +req.body.showId;
  await db.Tracking.findOrCreate({
    where: { userId, showId },
    defaults: { status: req.body.status }
  })
    .spread(tracking => {
      tracking.status = req.body.status;
      return tracking;
    })
    .then(tracking => tracking.save());

  const show = await helpers.getShowForUser(tmdbId, userId);
  const user = await helpers.getUser(req.userId);
  res.status(200).send({ user, show });
};

usersController.rate = async (req, res) => {
  const tmdbId = +req.params.showId;
  const userId = +req.userId;
  const showId = +req.body.showId;
  await db.Tracking.findOrCreate({
    where: { userId, showId },
    defaults: { rating: req.body.rating }
  })
    .spread(tracking => {
      tracking.rating = req.body.rating;
      return tracking;
    })
    .then(tracking => tracking.save());

  const show = await helpers.getShowForUser(tmdbId, userId);
  const user = await helpers.getUser(req.userId);
  res.status(200).send({ user, show });
};

module.exports = usersController;
