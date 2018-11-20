const usersController = {};
const userModule = require('../models/userModel');
const bcrypt = require('bcrypt');

usersController.get = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModule.getUser(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send();
  }
};

usersController.create = async (req,res) => {
  const {name, password, email, avatar} = req.body;
  let hash;
  if(!name || !password || !email) {
    res.status(400).send({
      errors: ['name, password or email missing']
    });
    return;
  }
  let user = await userModule.getUserByEmail(email);
  if (user) {
    res.status(400).send({
      errors: ['email already in use']
    })
    return;
  } else {
    try {
      hash = await bcrypt.hash(password, +process.env.PASSWORD_HASH)
    } catch (error) {
      console.log("Hash error: ", error);
      console.log("hash param: ", process.env.PASSWORD_HASH);
      throw new Error('Problem in hash function')
    }
    try {
      const userDb = await userModule.createUser(name,hash,email,avatar);
      res.status(201).send(userDb);
    } catch (error) {
      res.status(400).send();
    }
  }
};

usersController.status = async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  let show = await helpers.getShowForUser(id, userId);
  console.log(show);
  await db.Tracking.findOrCreate({
    where: { userId, showId: show.id },
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
