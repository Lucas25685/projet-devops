const mariadb = require('mariadb');
require('dotenv').config();

const connect = (host, user, password, database = null) => {
  const config = {
    host: host || process.env.DB_HOST || 'mariadb',
    user: user || process.env.DB_USER || 'root',
    password: password || process.env.DB_PASSWORD || 'root',
  };
  if (database) {
    config.database = database;
  }
  console.log('Seeding with host:', process.env.DB_HOST);
  return mariadb.createPool(config);
};

const pool = connect(
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_NAME || 'ticketing'
);

module.exports = {pool, connect};
