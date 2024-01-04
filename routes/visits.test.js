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
  it('should respond with status 200 with valid token', async () => {
    const res = await request(app).get('/visits?access_token=ABC123');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('user');
    expect(res.body[0]).toHaveProperty('country');
    expect(res.body.id).not.toBe(null);
  });
  it('should respond with status 401 with invalid token', async () => {
    const res = await request(app).get('/visits?access_token=ABC125');
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });
});

<<<<<<< Updated upstream
describe('GET /visits/13', () => {
  it('should respond with a single visit with valid token', async () => {
    const res = await request(app).get('/visits/13/?access_token=DEF456');
=======
// add .only to run just this it block
describe.only('GET /api/visits/', () => {
  it.only('should respond with a single visit with valid token', async () => {
    const res = await request(app).get('/api/visits/25/?access_token=DEF456');
>>>>>>> Stashed changes
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_id');
    expect(res.body.user_id).toEqual(1);
    expect(res.body).toHaveProperty('arrival_time');
    expect(res.body.departure_time).toEqual('2022-10-30T23:00:00.000Z');
  });
  it('should not respond with a single visit with invalid token', async () => {
    const res = await request(app).get('/visits/13/?access_token=DEF458');
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });
});

describe('POST /visit', () => {
  const visit = {
    user_id: 1,
    country_id: 2,
    arrival_time: '2023-05-23T13:30:00.000Z',
    departure_time: '2023-05-24T13:30:00.000Z',
  };

  it('should respond with a new visit with valid token', async () => {
    const res = await request(app)
      .post('/visits/?access_token=DEF456')
      .send(visit);
    visit.id = res.body.id;
    console.log(res, 'line60');
    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.arrival_time).toEqual('string');
    expect(res.body).toHaveProperty('country_id');
    expect(res.body).toHaveProperty('departure_time');
    expect(res.body.user_id).toEqual(visit.user_id);
    expect(res.body.departure_time).toEqual(visit.departure_time);
  });

  it('should not respond with a new visit with invalid token', async () => {
    const res = await request(app)
      .post('/visits/?access_token=DEF459')
      .send(visit);
    // visit.id = res.body.id;
    // console.log(visit.id, 'xyz');
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });

  it('should create the visit in the DB with valid token', async () => {
    const res = await request(app)
      .get(`/visits/${visit.id}/?access_token=DEF456`);
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.user_id).toEqual('number');
    expect(res.body).toHaveProperty('arrival_time');
    expect(res.body.arrival_time).toEqual(visit.arrival_time);
    expect(res.body.country).toHaveProperty('name');
  });

  it('should not create the visit in the DB with invalid token', async () => {
    const res = await request(app)
      .get(`/visits/${visit.id}/?access_token=DEF458`);
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });
});

describe('POST /visit (with timezone)', () => {
  const visit = {
    user_id: 2,
    country_id: 3,
    arrival_time: '2022-10-27T09:27:25.000+0100',
    departure_time: '2022-10-26T09:27:25.000Z',
  };
  const expectedArrivalTime = '2022-10-27T08:27:25.000Z';

  it('should respond with a new visit with valid token', async () => {
    const res = await request(app)
      .post('/visits/?access_token=ABC123')
      .send(visit);
    visit.id = res.body.id;
    expect(res.statusCode).toEqual(201);
    expect(res.body.arrival_time).toEqual(expectedArrivalTime);
  });

  it('should not respond with a new visit with invalid token', async () => {
    const res = await request(app)
      .post('/visits/?access_token=DEF459')
      .send(visit);
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });

  it('should create the visit in the DB with valid token', async () => {
    const res = await request(app)
      .get(`/visits/${visit.id}/?access_token=ABC123`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('arrival_time');
    expect(res.body.arrival_time).toEqual(expectedArrivalTime);
  });

  it('should not create the visit in the DB with invalid token', async () => {
    const res = await request(app)
      .get(`/visits/${visit.id}/?access_token=DEF458`);
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });
});
<<<<<<< Updated upstream
=======

describe('GET /new-visits', () => {
  it('should respond with status 200 with valid token', async () => {
    const res = await request(app).get('/new-visits/?access_token=DEF456');
    console.log(res, 'line150');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('name');
    expect(res.text).toContain('country');
    expect(res.text).not.toBe(null);
  });
  it('should respond with status 401 with invalid token', async () => {
    const res = await request(app).get('/api/visits?access_token=ABC455');
    expect(res.statusCode).toEqual(401);
    expect(res.body.status).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });
});
>>>>>>> Stashed changes
