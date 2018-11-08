const data = require('../data.json');

const showsController = {};

showsController.recommended = (_, res) => {
  res
    .cookie('heys', 'ho, lets', {
      expires: new Date(Date.now() + 43200 * 60),
      httpOnly: true
    })
    .status(200)
    .send(data.recommendations);
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
