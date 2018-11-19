const userModule = {};
const db = require('../models/index');
const Op = db.Sequelize.Op;

userModule.getUser = async (id) => {
  const user = await db.User.findOne({
    where: {id: id},
    include: [
      {
        association: 'shows',
        through: {
          attributes: ['status', 'rating', 'review' , 'createdAt'],
          as: 'tracking',
          where: { status: { [Op.ne]: 'none' } }
        }
      }
    ],
    order: [['shows', 'tracking', 'createdAt', 'DESC']]
  })
  return user.get({plain: true});
};

userModule.createUser = function createUser (name,password,email,avatar) {
  if (!avatar) avatar = 'https://res.cloudinary.com/diek0ztdy/image/upload/v1541756897/samples/sheep.jpg';
  return db.User.create({
    name: name,
    password: password,
    email: email,
    avatar: avatar,
  })
}

module.exports = userModule;