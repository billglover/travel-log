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

describe('GET /visits/1', () => {
  it('should respond with a single visit', async () => {
    const res = await request(app).get('/visits/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_id');
    expect(res.body.user_id).toEqual(1);
    expect(res.body).toHaveProperty('arrival_time');
    expect(res.body.departure_time).toEqual('2022-10-27T09:27:25.000Z');
  });
});

describe('POST /visit', () => {
  const visit = {
    user_id: 1,
    country_id: 3,
    arrival_time: '2022-10-27T09:27:25.000Z',
    departure_time: '2022-10-26T09:27:25.000Z',
  };

  it('should respond with a new visit', async () => {
    const res = await request(app)
      .post('/visits')
      .send(visit);
    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.arrival_time).toEqual('string');
    expect(res.body).toHaveProperty('country_id');
    expect(res.body).toHaveProperty('departure_time');
    expect(res.body.user_id).toEqual(visit.user_id);
    expect(res.body.departure_time).toEqual(visit.departure_time);
    visit.id = res.body.id;
  });
});
