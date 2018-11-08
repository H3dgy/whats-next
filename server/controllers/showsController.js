const db = require('../models/index');
const data = require('../data.json');

const showsController = {};

showsController.recommended = async (_, res) => {
  const results = await db.Show.findAll({ where: {}, raw: true });
  res.status(200).send(results);
};

showsController.get = (_, res) => {
  res.status(200).send(data.show);
};

showsController.markAsSeen = (req, res) => {
  console.log(`show ${req.params.showId} marked as seen`);
  res.status(200).end();
};

showsController.markToSee = (req, res) => {
  console.log(`show ${req.params.showId} marked to see`);
  res.status(200).end();
};

module.exports = showsController;
