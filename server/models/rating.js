'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      userId: DataTypes.INTEGER,
      showId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER
    },
    {}
  );
  return Rating;
};
