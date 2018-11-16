const request = require('supertest');
const app = require('../server');

describe('testing the user controller: creating user', () => {
  it('respond with the user object', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'test1',
        password: 'password01',
        email: 'test1@hotmail.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      name: 'test1',
      password: 'password01',
      email: 'test1@hotmail.com',
      avatar: 'test'
    });
  });
  it('Empty body should return 400', done => {
    return request(app)
      .post('/user')
      .send({})
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Empty name should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: '',
        password: 'password01',
        email: 'test3@hotmail.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Duplicate username should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test1',
        password: 'password01',
        email: 'test4@hotmail.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Empty password should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test5',
        password: '',
        email: 'test5@hotmail.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Empty email should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test6',
        password: 'password01',
        email: '',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Wrong email format should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test7',
        password: 'password01',
        email: 'testtest',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Duplicate email format should return 400', done => {
    return request(app)
      .post('/user')
      .send({
        name: 'test8',
        password: 'password01',
        email: 'test1@hotmail.com',
        avatar: 'test'
      })
      .set('Content-Type', 'application/json')
      .expect(400, done);
  });
  it('Empty profile picture should return 201 with standard picture', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'test9',
        password: 'password01',
        email: 'test9@hotmail.com',
        avatar: ''
      })
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      name: 'test9',
      password: 'password01',
      email: 'test9@hotmail.com',
      avatar:
        'https://res.cloudinary.com/diek0ztdy/image/upload/v1541756897/samples/sheep.jpg'
    });
  });
});

// describe('testing the user controller: get user', () => {
//   beforeAll(() => {
//     return request(app)
//       .post('/user')
//       .send({
//         name: 'get_test_1',
//         password: 'password01',
//         email: 'get_test_1@hotmail.com',
//         avatar: 'test'
//       })
//       .set('Content-Type', 'application/json');
//   });
//   it('should return user test1', done => {
//     return request(app)
//       .get('/user')
//       .set('id', '1')
//       .expect(
//         200,
//         {
//           name: 'get_test_1',
//           password: 'password01',
//           email: 'get_test_1@hotmail.com',
//           avatar: 'test'
//         },
//         done
//       );
//   });
//   it('should return 400', done => {
//     return request(app)
//       .get('/user')
//       .set('id', '100')
//       .expect(400, done);
//   });
// });

// should succeed
// Send req.userId

// router
//   .get('/recommended', showsController.recommended)
/**
 * When send req with userId should give back
 */
//   .post('/shows/search', showsController.search)
//   .get('/shows/:id', showsController.get)
//   .get('/user', usersController.get)
//   .post('/user/:id/status', usersController.status)
//   .post('/user/:id/rate', usersController.rate);
