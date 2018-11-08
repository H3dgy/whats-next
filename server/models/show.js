'use strict';
module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define(
    'Show',
    {
      tmbd: DataTypes.STRING,
      name: DataTypes.STRING,
      backdrop_path: DataTypes.STRING
    },
    {}
  );
  Show.associate = function(models) {
    Show.belongsToMany(models.User, { through: 'UsersShows' });
  };
  return Show;
};
