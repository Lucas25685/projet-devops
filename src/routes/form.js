const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const types = await pool.query('SELECT * FROM types');
  res.render('form', { types });
});

router.post('/', async (req, res) => {
  const { type_id, email, message } = req.body;
  if (!type_id || !email || !message) return res.status(400).send('Invalid data');
  await pool.query('INSERT INTO tickets (type_id, email, message) VALUES (?, ?, ?)', [type_id, email, message]);
  res.redirect('/');
});

module.exports = router;
