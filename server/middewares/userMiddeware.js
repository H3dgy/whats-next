const db = require('../models/index');

module.exports = async function(req, res, next) {
  if (!req.cookies.userId) {
    const user = await db.User.findOne({ where: { name: 'Alice' } });
    res.cookie('userId', user.id, { httpOnly: true });
    req.userId = user.id;
  } else {
    req.userId = req.cookies.userId;
  }
  next();
};
