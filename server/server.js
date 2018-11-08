const express = require('express');
const bodyParser = express.json();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router.js');
const userMiddleware = require('./middewares/userMiddeware');
const app = new express();

app
  .use(cors())
  .use(bodyParser)
  .use(cookieParser())
  .use(userMiddleware)
  .use(router)
  .use((req, res) => {
    res.status(404).send(`Nothing to see here. ${req.path} not found!`);
  });

module.exports = app;
