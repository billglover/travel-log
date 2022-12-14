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

describe('GET /countries', () => {
  it('should respond with an array of countries', async () => {
    const res = await request(app)
      .get('/countries');

    // The values for the expected result are based on those defined
    // in seed data. See /seeds/create-test-countries.js
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(3);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0].id).toEqual(1);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0].name).toEqual('Canada');
  });
});

describe('GET /countries/1', () => {
  it('should respond with a single country', async () => {
    const res = await request(app)
      .get('/countries/1');

    // The values for the expected result are based on those defined
    // in seed data. See /seeds/create-test-countries.js
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(1);
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toEqual('Canada');
  });
});
