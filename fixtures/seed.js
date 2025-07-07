const pool = require('../src/db');

async function seed() {
  const conn = await pool.getConnection();
  await conn.query("CREATE TABLE IF NOT EXISTS types (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))");
  await conn.query("CREATE TABLE IF NOT EXISTS tickets (id INT AUTO_INCREMENT PRIMARY KEY, type_id INT, email VARCHAR(255), message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
  await conn.query("INSERT IGNORE INTO types (id, name) VALUES (1, 'bug'), (2, 'question'), (3, 'suggestion')");
  conn.end();
}

seed();
