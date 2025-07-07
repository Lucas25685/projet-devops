const express = require('express');
const {pool} = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const tickets = await pool.query('SELECT t.id, ty.name as type, t.email, t.message, t.created_at FROM tickets t JOIN types ty ON t.type_id = ty.id ORDER BY t.created_at DESC');
  res.render('tickets', { tickets });
});

module.exports = router;
