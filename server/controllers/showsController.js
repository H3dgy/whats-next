const helpersShows = require('./helpersShows');
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
  try {
    await helpersShows.createOrUpdateShow(id);
    const show = await helpersShows.getShowForUser(id, req.headers.userid);
    const similar = await db.Show.findAll({
      where: { id: show.similar, backdrop_path: { [Op.ne]: null } }
    });
    show.similar = similar;
    const recommendations = await db.Show.findAll({
      where: { id: show.recommendations, backdrop_path: { [Op.ne]: null } }
    });
    show.recommendations = recommendations;
    res.status(200).send(show);
  }
  catch (error) {
    console.log('error', error);
    res.status(400).end();
  }
};

showsController.search = async (req, res) => {
  const { term } = req.body;
  if (!term) res.status(400).end();
  try {
    const results = await helpersShows.searchShows(term);
    res.status(200).send(results);
  }
  catch (error) {
    // console.log(error);
    res.status(400).end();
  }

};

module.exports = showsController;
