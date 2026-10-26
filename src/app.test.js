require('dotenv/config');
const { afterAll, describe, expect, it } = require('@jest/globals');
const request = require('supertest');
const app = require('./app.js');
const { closeDb } = require('./db/index.js');

afterAll(async () => {
  await closeDb();
});

describe('POST /api/subscribers', () => {
  it('should return 400 for an invalid email', async () => {
    const res = await request(app)
      .post('/api/subscribers')
      .send({ email: 'not-a-valid-email' })
      .expect(400);

    expect(res.body).toEqual({ error: 'Invalid email' });
  });
});
