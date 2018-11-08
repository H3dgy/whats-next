const express = require('express');
const bodyParser = express.json();
const cors = require('cors');
const app = new express();
const data = require('./data.json');

app
  .use(cors())
  .use(bodyParser)
  .get('/recommended', (_, res) => {
    res
      .cookie('heys', 'ho, lets', {
        expires: new Date(Date.now() + 43200 * 60),
        httpOnly: true
      })
      .status(200)
      .send(data.recommendations);
  })
  .get('/shows/:showId', (_, res) => {
    res.status(200).send(data.show);
  })
  .post('/shows/:showId/seen', (req, res) => {
    console.log(`show ${req.params.showId} marked as seen`);
    res.status(200).end();
  })
  .post('/shows/:showId/2see', (req, res) => {
    console.log(`show ${req.params.showId} marked to see`);
    res.status(200).end();
  })
  .listen(4000);
