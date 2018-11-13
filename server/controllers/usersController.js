const usersController = {};
const helpers = require('./helpers');
const db = require('../models/index');
const Op = db.Sequelize.Op;

usersController.get = async (req, res) => {
  const user = await helpers.getUser(req.userId);
  res.status(200).send(user);
};

usersController.status = async (req, res) => {
  const id = req.params.id;
  const userId = +req.userId;
  let show = await helpers.getShowForUser(id, userId);

  await db.Tracking.findOrCreate({
    where: { userId, showId: show.id },
    defaults: { status: req.body.status }
  })
    .spread(tracking => {
      tracking.status = req.body.status;
      return tracking;
    })
    .then(tracking => tracking.save());

  const similar = await db.Show.findAll({
    where: { id: show.similar, backdrop_path: { [Op.ne]: null } }
  });
  show = await helpers.getShowForUser(id, userId);
  show.similar = similar;
  res.status(200).send(show);
};

usersController.rate = async (req, res) => {
  const id = +req.params.id;
  const userId = +req.userId;
  const show = await helpers.getShowForUser(id, userId);

  await db.Tracking.findOrCreate({
    where: { userId, showId: show.id },
    defaults: { rating: req.body.rating }
  })
    .spread(tracking => {
      tracking.rating = req.body.rating;
      return tracking;
    })
    .then(tracking => tracking.save());

  const similar = await db.Show.findAll({
    where: { id: show.similar, backdrop_path: { [Op.ne]: null } }
  });
  show.similar = similar;
  res.status(200).send(show);
};

module.exports = usersController;
