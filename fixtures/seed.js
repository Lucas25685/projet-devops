const {connect} = require('../src/db');

async function seed() {
  let conn;
  try {
    conn = await connect(
        process.env.DB_HOST,
        process.env.DB_USER,
        process.env.DB_PASSWORD
    ).getConnection();

    await conn.query("CREATE DATABASE IF NOT EXISTS ticketing");
    await conn.query("USE ticketing");

    await conn.query("CREATE TABLE IF NOT EXISTS types (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))");
    await conn.query("CREATE TABLE IF NOT EXISTS tickets (id INT AUTO_INCREMENT PRIMARY KEY, type_id INT, email VARCHAR(255), message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
    await conn.query("INSERT IGNORE INTO types (id, name) VALUES (1, 'Bug'), (2, 'Question'), (3, 'Suggestion')");

  } catch (err){
    console.error('Erreur lors de l\'initialisation ou de l\'insertion des données :', err);
  } finally {
    if (conn) conn.end();
    process.exit(1);
  }
}

seed();