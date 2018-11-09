const fetch = require('node-fetch');

const db = require('../models/index');

const showsController = {};

showsController.recommended = async (_, res) => {
  const results = await db.Show.findAll({ where: {}, raw: true, limit: 20 });
  res.status(200).send(results);
};

showsController.get = async (req, res) => {
  const show = await getShow(req.params.showId);
  if (!show.similar.length) {
    const key = process.env.API_KEY;
    const id = req.params.showId;
    await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&append_to_response=similar`
    )
      .then(data => data.json())
      .then(async data => {
        show.number_of_seasons = data.number_of_seasons;
        show.similar = data.similar.results.map(el => el.id);
        await data.similar.results.map(async data => {
          await db.Show.findOrCreate({
            where: {
              tmdbId: data.id
            },
            defaults: {
              name: data.name,
              backdrop_path: data.backdrop_path,
              number_of_seasons: data.number_of_seasons,
              vote_average: data.vote_average,
              overview: data.overview
            }
          });
        });
        return show.save();
      });
  }

  const similar = await db.Show.findAll({ where: { tmdbId: show.similar } });
  show.similar = similar;

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
  if (localShow) return localShow;

  const key = process.env.API_KEY;
  return await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&append_to_response=similar`
  )
    .then(data => data.json())
    .then(async data => {
      await db.Show.create({
        tmdbId: data.id,
        name: data.name,
        backdrop_path: data.backdrop_path,
        number_of_seasons: data.number_of_seasons,
        vote_average: data.vote_average,
        overview: data.overview
      });
      return data;
    });
}

module.exports = showsController;
