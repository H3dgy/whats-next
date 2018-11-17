'use strict';
const md5 = require('md5');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        },
        unique: true
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Tracking, { as: 'trackings', foreignKey: 'userId' });
    User.belongsToMany(models.Show, {
      through: models.Tracking,
      as: 'shows',
      foreignKey: 'userId'
    });
    User.belongsToMany(models.User, {
      through: models.Following,
      as: 'following',
      foreignKey: 'following_id'
    });
    User.belongsToMany(models.User, {
      through: models.Following,
      as: 'followers',
      foreignKey: 'follower_id'
    })
  };
  return User;
};
