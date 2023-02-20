const request = require('supertest');
const app = require('../app');
const db = require('../db/db');

beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('Get /tokens', () => {
  it('should respond with status 200 ok', async () => {
    const res = await request(app).get('/tokens');
    expect(res.statusCode).toEqual(200);
  });
});
