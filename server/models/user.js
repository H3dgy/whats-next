'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      seen: DataTypes.ARRAY(DataTypes.DECIMAL),
      toSee: DataTypes.ARRAY(DataTypes.DECIMAL)
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Tracking, { foreignKey: 'userId' });
    User.belongsToMany(models.Show, {
      through: models.Tracking,
      as: 'show',
      foreignKey: 'showId'
    });
  };
  return User;
};
