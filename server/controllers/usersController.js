const usersController = {};
const db = require('../models/index');

usersController.get = async (req, res) => {
  const user = await db.User.findByPk(req.userId);
  const seen = await db.Show.findAll({ where: { tmdbId: user.seen } });
  const toSee = await db.Show.findAll({ where: { tmdbId: user.toSee } });
  user.seen = seen;
  user.toSee = toSee;
  res.status(200).send(user);
};

module.exports = usersController;
