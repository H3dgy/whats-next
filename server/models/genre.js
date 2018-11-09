'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    'Genre',
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING
    },
    {}
  );

  return Genre;
};
