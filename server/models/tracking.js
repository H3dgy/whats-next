'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tracking = sequelize.define(
    'Tracking',
    {
      rating: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {}
  );
  Tracking.associate = function(models) {
    Tracking.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Tracking.belongsTo(models.Show, { as: 'show', foreignKey: 'showId' });
  };
  return Tracking;
};
