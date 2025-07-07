const request = require('supertest');
const app = require('../../src/app');
const {pool} = require('../../src/db');

test('GET / returns 200', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
});

afterAll(async () => {
  await pool.end();
});