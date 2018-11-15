const helpers = require('./helpers');
const db = require('../models/index');

const showsController = {};
const Op = db.Sequelize.Op;

showsController.recommended = async (req, res) => {
  const trackedShows = await db.Tracking.findAll({
    where: { userId: req.userId },
    attributes: ['showId']
  });
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
        attributes: ['status', 'rating', 'review']
      }
    ],
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
