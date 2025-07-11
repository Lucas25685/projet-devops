const request = require('supertest');
const app = require('../../src/app');

test('GET / returns 200', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
});
