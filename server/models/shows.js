'use strict';

module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define('Show', {
    tmdbId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    backdrop_path: DataTypes.STRING
  });
  Show.associate = function(models) {
    Show.belongsToMany(models.User, {
      through: 'SeenShows',
      as: 'seenBy',
      foreignKey: 'showId'
    });
    Show.belongsToMany(models.User, {
      through: 'ToSeeShows',
      as: 'toSeeBy',
      foreignKey: 'showId'
    });
  };
  return Show;
};
