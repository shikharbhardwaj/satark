require('dotenv').config();

const databaseName = 'satark_db';
const pass = process.env.DB_PASS;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      port: 5432,
      host: 'localhost',
      database: databaseName,
      user: 'node_user',
      password: pass,
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
};
