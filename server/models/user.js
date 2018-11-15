'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING
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
  };
  return User;
};
