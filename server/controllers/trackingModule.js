const trackingModule = {};
const db = require('../models');


trackingModule.findOrCreateRating = async (userId, showId, rating) => {
  await db.Tracking.findOrCreate({
    where: { userId, showId: showId },
  })
    .spread(tracking => {
      tracking.rating = rating;
      return tracking;
    })
    .then(tracking => tracking.save());
}

trackingModule.findOrCreateStatus = async (userId, showId, status) => {
  await db.Tracking.findOrCreate({
    where: { userId, showId: showId },
  })
    .spread(tracking => {
      tracking.status = status;
      return tracking;
    })
    .then(tracking => tracking.save());
}

trackingModule.findOrCreateReview = async (userId, showId, review) => {
  await db.Tracking.findOrCreate({
    where: { userId, showId: showId },
  })
    .spread(tracking => {
      tracking.status = review;
      return tracking;
    })
    .then(tracking => tracking.save());
}

module.exports = trackingModule;
