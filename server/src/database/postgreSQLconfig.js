const { Pool } = require('pg');

const
  {
    POSTGRESQL_PASSWORD,
    POSTGRESQL_USERNAME,
    POSTGRESQL_DATABASE,
    POSTGRESQL_HOST,
  } = process.env;

const pool = new Pool({
  user: POSTGRESQL_USERNAME,
  host: POSTGRESQL_HOST,
  database: POSTGRESQL_DATABASE,
  password: POSTGRESQL_PASSWORD,
  port: 5432,
});

if (pool) {
  console.log('Database connected!');
}

module.exports = pool;
