const usersController = {};
const db = require('../models/index');

function getUser(id) {
  return db.User.findByPk(id, {
    include: [
      {
        association: 'shows',
        attributes: { exclude: ['tmdbBlob'] },
        through: { attributes: ['status', 'rating'], as: 'tracking' }
      }
    ]
  });
}

usersController.get2 = async (req, res) => {
  const user = await db.User.findByPk(req.userId, { raw: true });
  const seen = await db.Show.findAll({ where: { tmdbId: user.seen } });
  const toSee = await db.Show.findAll({ where: { tmdbId: user.toSee } });
  user.seen = seen;
  user.toSee = toSee;

  res.status(200).send(user);
};

usersController.get = async (req, res) => {
  const user = await getUser(req.userId);
  res.status(200).send(user);
};

usersController.status = async (req, res) => {
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

  const user = await getUser(req.userId);
  res.status(200).send(user);
};

usersController.rate = async (req, res) => {
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

  const user = await getUser(req.userId);
  res.status(200).send(user);
};

module.exports = usersController;
