const usersController = {};
const helpers = require('./helpers');
const db = require('../models/index');
const Op = db.Sequelize.Op;
const trackingModule = require('./trackingModule');


usersController.get = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await helpers.getUser(id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

usersController.create = async (req,res) => {
  const {name, password, email, avatar} = req.body;
  if(!name || !password || !email) {
    res.status(400).send();
    return;
  }
  try {
    const user = await helpers.createUser(name,password,email,avatar);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send();
  }
}

usersController.status = async (req, res) => {
  const id = req.params.id;
  const userId = +req.userId;
  let show = await helpers.getShowForUser(id, userId);

  await trackingModule.findOrCreateStatus(userId, show.id,req.body.status);

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

  await trackingModule.findOrCreateRating(userId, show.id,req.body.rating);

  const similar = await db.Show.findAll({
    where: { id: show.similar, backdrop_path: { [Op.ne]: null } }
  });
  show.similar = similar;
  res.status(200).send(show);
};

// check in detail

usersController.review = async (req, res) => {
  const id = +req.params.id;
  const userId = +req.userId;
  const show = await helpers.getShowForUser(id, userId);

  await trackingModule.findOrCreateReview(userId, show.id,req.body.review);

  const similar = await db.Show.findAll({
    where: { id: show.similar, backdrop_path: { [Op.ne]: null } }
  });
  show.similar = similar;
  res.status(200).send(show);
};

module.exports = usersController;
