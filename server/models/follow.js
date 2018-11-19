'use strict';
module.exports = (sequelize, DataTypes) => {
  const Following = sequelize.define('Following', {
    follower_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    following_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
  }, {});
  Following.associate = function(models) {
    // associations can be defined here
  };
  return Following;
};