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
  return User;
};
