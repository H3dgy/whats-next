const express = require('express');
const bodyParser = express.json();
const cors = require('cors');
const app = new express();
const recommended = require('./data.json');

app
  .use(cors())
  .use(bodyParser)
  .get('/:userId/recommended', (_, res) => {
    res.status(200).send(recommended);
  })
  .listen(4000);
