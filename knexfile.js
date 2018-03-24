const databaseName = 'satark_db';

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      port: 5432,
      host: 'localhost',
      database: databaseName,
      user: 'node_user',
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      port: 5432,
      host: 'localhost',
      database: databaseName,
      user: 'node_user',
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds',
    },
  },
};
