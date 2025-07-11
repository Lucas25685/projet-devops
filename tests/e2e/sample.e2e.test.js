const request = require('supertest');
const app = require('../../src/app');
const {pool} = require('../../src/db');

test('GET / returns 200', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
});

afterAll(async () => {
  //délai pour être sur que tout ce qui est en arriere plan est terminé
  await new Promise((res) => setTimeout(res, 100));
  await pool.end();
});
