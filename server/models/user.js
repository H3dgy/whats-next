'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING
  });
  User.associate = function(models) {
    User.belongsToMany(models.Show, {
      through: 'SeenShows',
      as: 'seen',
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Show, {
      through: 'ToSeeShows',
      as: 'toSee',
      foreignKey: 'userId'
    });
  };
  return User;
};
