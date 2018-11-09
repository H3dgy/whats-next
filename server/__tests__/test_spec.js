const request = require('supertest');
const app = require('../server');

describe('testing the shows controller', () => {
  describe('GET /recommended', () => {
    it('returns 20 elements at most', async () => {
      const response = await request(app).get('/recommended');
      expect(response.body.length).toBeLessThanOrEqual(20);
    });
  });
});
