const showModule = {};
const db = require('../models/index');
const Op = db.Sequelize.Op;


showModule.findAll = async (ids) => {
  const result = await db.Show.findAll({
    where: { id: ids, backdrop_path: { [Op.ne]: null } }
  });
  return result
  .map(el => el.get({plain: true}));
}

showModule.getShowForUser = async (id, userId) => {
  const result = await db.Show.findOne({
    where: { id },
    include: [
      {
        model: db.Tracking,
        as: 'tracking',
        where: { userId: userId },
        required: false,
        attributes: ['status', 'rating', 'review']
      }
    ]
  });
  return result.get({plain: true});
};

module.exports = showModule;