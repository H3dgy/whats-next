const usersController = {};
const db = require('../models/index');

usersController.get = async (req, res) => {
  const user = await db.User.findByPk(req.userId, { raw: true });
  const seen = await db.Show.findAll({ where: { tmdbId: user.seen } });
  const toSee = await db.Show.findAll({ where: { tmdbId: user.toSee } });
  user.seen = seen;
  user.toSee = toSee;

  res.status(200).send(user);
};

usersController.addSeen = async (req, res) => {
  const user = await db.User.findByPk(req.userId);
  const id = +req.params.showId;

  if (user.seen.includes(id)) {
    res.status(200).send(user);
    return;
  }

  if (user.toSee.includes(id)) {
    user.toSee = user.toSee.filter(sId => sId !== id);
  }
  user.seen = user.seen.concat(id);
  await user.save();

  res.status(200).send(user);
};

usersController.addToSee = async (req, res) => {
  const user = await db.User.findByPk(req.userId);
  const id = +req.params.showId;

  if (user.toSee.includes(id)) {
    res.status(200).send(user);
    return;
  }

  if (user.seen.includes(id)) {
    user.seen = user.seen.filter(sId => sId !== id);
  }
  user.toSee = user.toSee.concat(id);
  await user.save();

  res.status(200).send(user);
};

usersController.removeSeen = async (req, res) => {
  const user = await db.User.findByPk(req.userId);
  const id = +req.params.showId;
  user.seen = user.seen.filter(sId => sId !== id);
  await user.save();

  res.status(200).send(user);
};

usersController.removeToSee = async (req, res) => {
  const user = await db.User.findByPk(req.userId);
  const id = +req.params.showId;

  user.toSee = user.toSee.filter(sId => sId !== id);
  await user.save();

  res.status(200).send(user);
};

module.exports = usersController;
