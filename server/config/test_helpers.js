const db = require('../models');
const trackingSeeder = require('../testSeeding/trackingSeeders');
const trackingController = require('../controllers/trackingController');


describe('testing the tracking Controller: create status', () => {
  beforeEach(async () => {
   await trackingSeeder.upShows(db.sequelize.queryInterface);
   await trackingSeeder.upUsers(db.sequelize.queryInterface);
  })
  afterEach(async () => {
   await trackingSeeder.downTracking(db.sequelize.queryInterface);
   await trackingSeeder.downShows(db.sequelize.queryInterface);
   await trackingSeeder.downUsers(db.sequelize.queryInterface);
  })
  it('should response with an object with all movies unwrapped', async () => {
    const res = await trackingController._unwrapSimilar(100,1);
    expect(res).toMatchObject({
      similar: [{id: 125}, {id: 135}]
    });
  });
});
