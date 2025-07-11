const request = require('supertest');
const express = require('express');
const ticketsRoute = require('../../src/routes/tickets');

jest.mock('../../src/db', () => ({
  pool: {
    query: jest.fn()
  }
}));

const { pool } = require('../../src/db');

describe('GET /tickets', () => {
  it('renvoie les tickets depuis la base', async () => {
    pool.query.mockResolvedValue([
      { id: 1, type: 'Bug', email: 'test@test.com', message: 'Test', created_at: '2024-01-01' }
    ]);

    const app = express();
    app.set('view engine', 'ejs');
    app.use('/tickets', ticketsRoute);

    const res = await request(app).get('/tickets');

    expect(res.statusCode).toBe(200);
    expect(pool.query).toHaveBeenCalled();
  });
});
