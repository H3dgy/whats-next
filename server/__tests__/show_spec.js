const request = require('supertest');
const app = require('../server');

describe('testing the show controller: ', () => {
  it('responds with json', done => {
    return request(app)
      .post('/shows/search')
      .send({
        term: 'rick',
      })
      .set('Content-Type', 'application/json')
      .expect(
        200,
        // {
        //   name: 'Rick',
        // },
        done
      );
  });
});
