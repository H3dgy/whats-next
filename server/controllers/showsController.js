const helpersShows = require('./helpersShows');
const db = require('../models/index');
const showsController = {};
const Op = db.Sequelize.Op;

showsController.recommended = async (req, res) => {
  const trackedShows = await _findTrackedShows(req.userId);
  const trackedShowsIds = trackedShows.map(el => el.showId);
  const shows = await _findShows(trackedShowsIds,req.userId);
  const fullShows = await _findFullShows(shows);
  res.status(200).send(fullShows);
};

_findTrackedShows = async (userId) => {
  return await db.Tracking.findAll({
    where: { userId: userId },
    attributes: ['showId']
  })
};

_findShows = async(trackedShowsIds,userId) => {
  return await db.Show.findAll({
    where: {
      id: trackedShowsIds,
      backdrop_path: { [Op.ne]: null }
    },
    attributes: { exclude: ['similar'] },
    include: [
      {
        model: db.Tracking,
        as: 'tracking',
        where: { userId: userId },
        required: false,
        attributes: ['status', 'rating', 'review']
      }
    ],
    order: [['recommendations', 'DESC']]
  });
};

_findFullShows = async (shows) => {
  return await Promise.all(
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
}

showsController.get = async (req, res) => {
  const id = req.params.id;
  try {
    await helpersShows.createOrUpdateShow(id);
    const show = await helpersShows.getShowForUser(id, req.headers.userid);
    if (id === '815') {const k = await db.Show.findAll();
    console.log(k);}
    const similar = await _findSimilar(show);
    show.similar = similar;
    const recommendations = await _findRecommendations(show);
    show.recommendations = recommendations;
    res.status(200).send(show);
  }
  catch (error) {
    // console.log('error', error);
    res.status(400).end();
  }
};

_findSimilar = async (show) => {
  return await db.Show.findAll({
    where: { id: show.similar, backdrop_path: { [Op.ne]: null } }
  });
};

_findRecommendations = async (show) => {
  return await db.Show.findAll({
    where: { id: show.recommendations, backdrop_path: { [Op.ne]: null } }
  });
}

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
