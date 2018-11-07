const express = require('express');
const bodyParser = express.json();
const cors = require('cors');
const app = new express();
const data = require('./data.json');

app
  .use(cors())
  .use(bodyParser)
  .get('/recommended', (_, res) => {
    res.status(200).send(data.recommendations);
  })
  .get('/shows/:showId', (_, res) => {
    res.status(200).send(data.show);
  })
  .listen(4000);
