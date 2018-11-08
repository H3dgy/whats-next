const fetch = require('node-fetch');

const db = require('../models/index');

const showsController = {};

showsController.recommended = async (_, res) => {
  const results = await db.Show.findAll({ where: {}, raw: true });
  res.status(200).send(results);
};

showsController.get = async (req, res) => {
  const show = await getShow(req.params.showId);
  res.status(200).send(show);
};

showsController.markAsSeen = async (req, res) => {
  const user = await db.User.findByPk(req.userId);
  user.seen = user.seen.concat(req.params.showId);
  await user.save();
  res.status(200).send();
};

showsController.markToSee = async (req, res) => {
  const user = await db.User.findByPk(req.userId);
  user.toSee = user.toSee.concat(req.params.showId);
  await user.save();
  res.status(200).end();
};

async function getShow(id) {
  const localShow = await db.Show.findOne({ where: { tmdbId: +id } });
  if (localShow) {
    return localShow;
  } else {
    const key = process.env.API_KEY;
    const show = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${key}`
    )
      .then(data => data.json())
      .then(data =>
        db.Show.create({
          tmdbId: data.id,
          name: data.name,
          backdrop_path: data.backdrop_path,
          number_of_seasons: data.number_of_seasons,
          vote_average: data.vote_average,
          overview: data.overview
        })
      );
    return show;
  }
}

module.exports = showsController;
