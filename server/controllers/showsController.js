const fetch = require('node-fetch');

const db = require('../models/index');

const showsController = {};

showsController.recommended = async (_, res) => {
  const results = await db.Show.findAll({ where: {}, raw: true });
  res.status(200).send(results);
};

showsController.get = async (req, res) => {
  const show = await getShow(req.params.showId);
  console.log('show-->', show.tmdbId);

  res.status(200).send(show);
};

showsController.markAsSeen = (req, res) => {
  console.log(`show ${req.params.showId} marked as seen`);
  res.status(200).end();
};

showsController.markToSee = (req, res) => {
  console.log(`show ${req.params.showId} marked to see`);
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
          name: data.name,
          tmdbId: data.id,
          backdrop_path: data.backdrop_path
        })
      );
    return show;
  }
}

module.exports = showsController;
