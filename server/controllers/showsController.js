const helpers = require('./helpers');
const db = require('../models/index');

const showsController = {};
const Op = db.Sequelize.Op;

showsController.recommended = async (req, res) => {
  const trackedShows = await db.Tracking.findAll({
    where: { userId: req.userId },
    attributes: ['showId']
    // order: db.Sequelize.fn('RANDOM')
  });
  // array_length(array[1,2,3], 1)
  const trackedShowsIds = trackedShows.map(el => el.showId);
  const shows = await db.Show.findAll({
    where: {
      id: trackedShowsIds,
      backdrop_path: { [Op.ne]: null }
    },
    attributes: { exclude: ['similar'] },
    include: [
      {
        model: db.Tracking,
        as: 'tracking',
        where: { userId: req.userId },
        required: false,
        attributes: ['status', 'rating']
      }
    ],
    limit: 5,
    order: [['recommendations', 'DESC']]
  });

  const fullShows = await Promise.all(
    shows.map(async show => {
      const recommendations = await db.Show.findAll({
        where: {
          id: show.recommendations,
          backdrop_path: { [Op.ne]: null }
        },
        attributes: { exclude: ['similar', 'recommendations'] }
      });
      show.recommendations = recommendations;
      return show;
    })
  );

  res.status(200).send(fullShows);
};

showsController.recommended2 = async (req, res) => {
  const results = await db.Show.findAll({
    where: { backdrop_path: { [Op.ne]: null } },
    include: [
      {
        model: db.Tracking,
        as: 'tracking',
        where: { userId: req.userId },
        required: false,
        attributes: ['status', 'rating']
      }
    ],
    limit: 20,
    order: [['vote_average', 'DESC']]
  });
  res.status(200).send(results);
};

showsController.get = async (req, res) => {
  const id = req.params.id;
  await helpers.createOrUpdateShow(id);
  const show = await helpers.getShowForUser(id, req.userId);

  const similar = await db.Show.findAll({
    where: { id: show.similar, backdrop_path: { [Op.ne]: null } }
  });
  show.similar = similar;
  const recommendations = await db.Show.findAll({
    where: { id: show.recommendations, backdrop_path: { [Op.ne]: null } }
  });
  show.recommendations = recommendations;
  res.status(200).send(show);
};

showsController.search = async (req, res) => {
  const { term } = req.body;
  const results = await helpers.searchShows(term);
  res.status(200).send(results);
};

module.exports = showsController;
