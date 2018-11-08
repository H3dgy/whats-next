'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      seen: DataTypes.ARRAY(DataTypes.DECIMAL),
      toSee: DataTypes.ARRAY(DataTypes.DECIMAL)
    },
    {}
  );
  User.associate = function(models) {
    User.belongsToMany(models.Show, { through: 'UsersShows' });
  };
  return User;
};
