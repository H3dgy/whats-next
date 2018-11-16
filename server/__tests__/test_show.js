const request = require('supertest');
const app = require('../server');

describe('testing the show controller: search', () => {
  it('responds with json when given show name', done => {
    return request(app)
      .post('/shows/search')
      .send({
        term: 'peep show'
      })
      .set('Content-Type', 'application/json')
      .expect(
        200,
        [{ id: 815,
          name: 'Peep Show'},
          {
          id: 12063,
          name: 'Peep Show'
        }],
        done
      );
  });
  it('should be case insensitive', done => {
    return request(app)
      .post('/shows/search')
      .send({
        term: 'peEp sHow'
      })
      .set('Content-Type', 'application/json')
      .expect(
        200,
        [{ id: 815,
          name: 'Peep Show'},
          {
          id: 12063,
          name: 'Peep Show'
        }],
        done
      );
  });
  it('should return 400 for empty requests', done => {
    return request(app)
      .post('/shows/search')
      .send({
        term: ''
      })
      .set('Content-Type', 'application/json')
      .expect(
        400,
        done
      );
  });
  it('should only return the first 20 results', async () => {
    const response = await request(app)
      .post('/shows/search')
      .send({
        term: 'a'
      })
      .set('Content-Type', 'application/json')
      expect(response.body).toHaveLength(20)

  });

});

describe('testing the show controller: id', () => {
  it('responds with json containing recommended tv shows when given show name', async () => {
    const response = await request(app)
      .get('/shows/815')
      .set('Content-Type', 'application/json')
      .set('userId',1)
      .expect(200);
    expect(response.body.id.toString()).toMatch('815')
    const listOfRecommendedIds = response.body.recommendations.map(obj => obj.id).every( number => number > 0);
    expect(listOfRecommendedIds).toEqual(true);
  });
  it('responds with 400 when given incorrect type show id', async () => {
    return request(app)
      .get('/shows/test')
      .set('Content-Type', 'application/json')
      .set('userId',1)
      .expect(400);
  });
  it('responds with 400 when given incorrect number show id', async () => {
    return request(app)
      .get('/shows/222222222')
      .set('Content-Type', 'application/json')
      .set('userId',1)
      .expect(400);
  });
  it('responds with 400 when given incorrect input', async () => {
    return request(app)
      .get('/shows/2-2')
      .set('Content-Type', 'application/json')
      .set('userId',1)
      .expect(400);
  });
});

describe('testing the show controller: recommended', () => {
  it('responds with json containing recommended tv shows when given show name', async () => {
    const response = await request(app)
      .get('/recommended')
      .set('Content-Type', 'application/json')
      .set('userId',1)
    console.log(response.body);
  });

});

