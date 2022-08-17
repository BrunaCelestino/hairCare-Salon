const { Pool } = require('pg');

const { POSTGRESQL_PASSWORD } = process.env;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hair_care_salon_chain',
  password: POSTGRESQL_PASSWORD,
  port: 5432,
});

if (pool) {
  console.log('Database connected!');
}

module.exports = pool;
