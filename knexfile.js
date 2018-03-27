require('dotenv').config();

const databaseName = 'satark';
const pass = process.env.DB_PASS;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      port: 5432,
      host: 'localhost',
      database: databaseName,
      user: 'satark',
      password: pass,
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      port: 5432,
      host: 'localhost',
      database: 'passport_test',
      user: 'satark',
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
