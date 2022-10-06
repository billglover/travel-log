const request = require('supertest');
const app = require('../app');
const db = require('../db/db');

// Update the database with the latest schema and load seed data before
// running tests. If NODE_ENV is set to `test` then the database used
// during testing will be held in memory for the duration of the tests
// and then discarded.
beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

// After tests have completed, destroy the database as the test data is no
// longer needed.
afterAll(async () => {
  await db.destroy();
});

describe('GET /users', () => {
  it('should respond with an array of users', async () => {
    const res = await request(app)
      .get('/users');

    // The values for the expected result are based on those defined
    // in seed data. See /db/seeds/initial_data.js
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0].id).toEqual(1);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0].name).toEqual('jen');
  });
});

describe('GET /users/1', () => {
  it('should respond with a single user', async () => {
    const res = await request(app)
      .get('/users/1');

    // The values for the expected result are based on those defined
    // in seed data. See /db/seeds/initial_data.js
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(1);
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toEqual('jen');
  });
});

describe('POST /users', () => {
  const user = {
    name: 'test_user',
  };

  it('should respond with a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send(user);
    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.id).toEqual('number');
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toEqual(user.name);

    // Keep the user.id for use in subsequent tests
    user.id = res.body.id;
  });

  it('should create the user in the DB', async () => {
    const res = await request(app)
      .get(`/users/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(user.id);
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toEqual(user.name);
  });

  it('should not create the same user twice', async () => {
    const res = await request(app)
      .post('/users')
      .send(user);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual(`user '${user.name}' already exists`);
  });
});
