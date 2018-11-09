const request = require('supertest');
const app = require('../server');

describe('testing the shows controller', () => {
  describe('GET /recommended', () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get('/recommended');
    });
    it('returns 20 elements at most', async () => {
      expect(response.body.length).toBeLessThanOrEqual(20);
    });
    it('returns the needed attrs', async () => {
      const el = response.body[0];
      expect(el.tmdbId).not.toBeUndefined();
      expect(el.name).not.toBeUndefined();
      expect(el.backdrop_path).not.toBeUndefined();
    });
  });

  describe('GET /shows/:showId', () => {});
});
