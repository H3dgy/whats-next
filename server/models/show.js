'use strict';
module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define(
    'Show',
    {
      tmdbId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      backdrop_path: DataTypes.STRING,
      number_of_seasons: DataTypes.INTEGER,
      vote_average: DataTypes.FLOAT,
      overview: DataTypes.TEXT
    },
    {}
  );
  Show.associate = function(models) {
    Show.belongsToMany(models.User, { through: 'UsersShows' });
  };
  return Show;
};
