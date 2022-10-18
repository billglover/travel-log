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

describe('GET /visits', () => {
  it('should respond with status 200 ok', async () => {
    const res = await request(app).get('/visits');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('country_id');
    expect(res.body[0]).toHaveProperty('user_id');
    expect(res.body.id).not.toBe(null);
  });
});
