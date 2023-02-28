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
    expect(res.body[0]).toHaveProperty('user_id');
    expect(res.body[1]).toHaveProperty('bearer_token');
    expect(res.body.id).not.toBe(null);
  });
});

describe('GET /tokens/1', () => {
  it('should respond with a single token', async () => {
    const res = await request(app).get('/tokens/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_id');
    expect(res.body).toHaveProperty('bearer_token');
    expect(res.body.user_id).toEqual(1);
  });
});
