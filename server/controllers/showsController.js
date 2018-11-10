const fetch = require('node-fetch');

const db = require('../models/index');

const showsController = {};
const Op = db.Sequelize.Op;

showsController.recommended = async (_, res) => {
  const results = await db.Show.findAll({
    where: { backdrop_path: { [Op.ne]: null } },
    raw: true,
    limit: 20,
    order: [['vote_average', 'DESC']]
  });
  res.status(200).send(results);
};

showsController.get = async (req, res) => {
  const id = +req.params.showId;
  const show = (await getShow(id)).get({ plain: true });
  const user = await db.User.findByPk(req.userId, { raw: true });
  const user_rating = await db.Rating.findOne({
    where: { userId: user.id, showId: show.tmdbId }
  });
  show.user_rating = (user_rating && user_rating.rating) || 0;
  const similar = await db.Show.findAll({
    where: { tmdbId: show.similar, backdrop_path: { [Op.ne]: null } }
  });
  show.similar = similar;
  const recommendations = await db.Show.findAll({
    where: { tmdbId: show.recommendations, backdrop_path: { [Op.ne]: null } }
  });
  show.recommendations = recommendations;
  res.status(200).send(show);
};

showsController.search = async (req, res) => {
  const { term } = req.body;
  const results = await searchShows(term);
  res.status(200).send(results);
};

async function getShow(id) {
  const localShow = await db.Show.findOne({ where: { tmdbId: id } });
  if (!localShow) return await createShow(id);

  if (completeInfo(localShow)) return localShow;
  else return await updateShowInfo(id);
}

function completeInfo(show) {
  return (
    !!show.number_of_seasons &&
    !!show.similar.length &&
    !!show.recommendations.length &&
    !!show.tmdbBlob
  );
}

async function createShow(id) {
  const key = process.env.API_KEY;
  return await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&append_to_response=similar`
  )
    .then(data => data.json())
    .then(async data => {
      const attrs = {
        tmdbId: data.id,
        name: data.name,
        backdrop_path: data.backdrop_path,
        poster_path: data.poster_path,
        number_of_seasons: data.number_of_seasons,
        vote_average: data.vote_average,
        overview: data.overview,
        similar: data.similar.results.map(el => el.id),
        recommendations: data.recommendations.results.map(el => el.id),
        genre_ids: data.genre_ids,
        tmdbBlob: data
      };
      const show = await db.Show.create(attrs);
      await createRelatedShows(data.similar.results);
      await createRelatedShows(data.recommendations.results);
      return show;
    });
}

async function updateShowInfo(id) {
  const show = await db.Show.findOne({ where: { tmdbId: id } });
  const key = process.env.API_KEY;

  return await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&append_to_response=similar,recommendations`
  )
    .then(data => data.json())
    .then(async data => {
      const attrs = {
        number_of_seasons: data.number_of_seasons,
        similar: data.similar.results.map(el => el.id),
        recommendations: data.recommendations.results.map(el => el.id),
        tmdbBlob: data
      };
      await show.update(attrs, { where: { tmdbId: data.id } });
      await createRelatedShows(data.similar.results);
      await createRelatedShows(data.recommendations.results);
      return show;
    });
}

async function createRelatedShows(showsArr) {
  await Promise.all(
    showsArr.map(async show => {
      const ss = await db.Show.findOne({ where: { tmdbId: show.id } });
      if (!ss) {
        await db.Show.create({
          tmdbId: show.id,
          name: show.name,
          backdrop_path: show.backdrop_path,
          poster_path: show.poster_path,
          vote_average: show.vote_average,
          overview: show.overview,
          genre_ids: show.genre_ids
        });
      }
    })
  );
}

async function searchShows(term) {
  const key = process.env.API_KEY;
  const results = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${key}&query=${term}`
  )
    .then(data => data.json())
    .then(data => data.results);

  return results.map(res => ({ id: res.id, name: res.name }));
}

module.exports = showsController;
