const trackingController = {};
const trackingModule = require('../modules/trackingModule');
const showModule = require('../modules/showModule')

trackingController.status = async (req, res) => {
  const id = req.params.id;
  const {userId, status} = req.body;
  try {
    await trackingModule.findOrCreateStatus(userId, id, status);
    const show = await trackingController._unwrapSimilar(id, userId);
    res.status(201).send(show);
  } catch (error) {
    res.status(400).send();
  }
};

// returns a show with all the movies in the similar property
trackingController._unwrapSimilar = async (movieId, userId) => {
  const show = await showModule.getShowForUser(movieId, userId);
  const similar = await showModule.findAll(show.similar);
  show.similar = similar;
  return show;
}


trackingController.rate = async (req, res) => {
  const id = req.params.id;
  const {userId, rating} = req.body;
  try {
    await trackingModule.findOrCreateRating(userId, id, rating);
    const show = await trackingController._unwrapSimilar(id, userId);
    res.status(201).send(show);
  } catch (error) {
    //console.log(error);
    res.status(400).send();
  }
};

// check in detail

trackingController.review = async (req, res) => {
  const id = req.params.id;
  const {userId, review} = req.body;
  
  try {
    await trackingModule.findOrCreateReview(userId, id, review);
    const show = await trackingController._unwrapSimilar(id, userId);
    res.status(201).send(show);
  } catch (error) {
    //console.log(error);
    res.status(400).send();
  }
};

module.exports = trackingController;
