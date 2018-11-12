const fetch = require('node-fetch');
const db = require('../models/index');
const Op = db.Sequelize.Op;

const helpers = {};

helpers.getShowForUser = function getShowForUser(id, userId) {
  return db.Show.findOne({
    where: { id },
    include: [
      {
        model: db.Tracking,
        as: 'tracking',
        where: { userId: userId },
        required: false,
        attributes: ['status', 'rating']
      }
    ]
  });
};

helpers.createOrUpdateShow = async function createOrUpdateShow(id) {
  const localShow = await db.Show.findByPk(id);
  if (!localShow) return await this.createShow(id);
  else if (!completeInfo(localShow)) return await this.updateShowInfo(id);
  else return localShow;
};

function completeInfo(show) {
  return (
    !!show.number_of_seasons &&
    !!show.similar.length &&
    !!show.recommendations.length
  );
}

helpers.createShow = async function createShow(id) {
  const key = process.env.API_KEY;
  return await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&append_to_response=similar,recommendations`
  )
    .then(data => data.json())
    .then(async data => {
      const similar = (data.similar && data.similar.results) || [];
      const recommendations =
        (data.recommendations && data.recommendations.results) || [];
      const attrs = {
        id: data.id,
        name: data.name,
        backdrop_path: data.backdrop_path,
        poster_path: data.poster_path,
        number_of_seasons: data.number_of_seasons,
        vote_average: data.vote_average,
        overview: data.overview,
        similar: similar.map(el => el.id),
        recommendations: recommendations.map(el => el.id),
        genre_ids: data.genre_ids
      };
      const show = await db.Show.create(attrs);
      await createRelatedShows(attrs.similar);
      await createRelatedShows(attrs.recommendations);
      return show;
    });
};

helpers.updateShowInfo = async function updateShowInfo(id) {
  const show = await db.Show.findByPk(id);
  const key = process.env.API_KEY;

  return await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&append_to_response=similar,recommendations`
  )
    .then(data => data.json())
    .then(async data => {
      const similar = (data.similar && data.similar.results) || [];
      const recommendations =
        (data.recommendations && data.recommendations.results) || [];

      const attrs = {
        number_of_seasons: data.number_of_seasons,
        similar: similar.map(el => el.id),
        recommendations: recommendations.map(el => el.id)
      };
      await show.update(attrs, { where: { id } });
      await createRelatedShows(attrs.similar);
      await createRelatedShows(attrs.recommendations);
      return show;
    });
};

async function createRelatedShows(showsArr) {
  await Promise.all(
    showsArr.map(async show => {
      const ss = await db.Show.findOne({ where: { id: show.id } });
      if (!ss) {
        await db.Show.create({
          id: show.id,
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

helpers.searchShows = async function searchShows(term) {
  const key = process.env.API_KEY;
  const results = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${key}&query=${term}`
  )
    .then(data => data.json())
    .then(data => data.results);

  return results.map(res => ({ id: res.id, name: res.name }));
};

helpers.getUser = function getUser(id) {
  return db.User.findByPk(id, {
    include: [
      {
        association: 'shows',
        through: {
          attributes: ['status', 'rating'],
          as: 'tracking',
          where: { status: { [Op.ne]: '' } }
        }
      }
    ]
  });
};

module.exports = helpers;
