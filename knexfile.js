module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      port: 5432,
      host: 'localhost',
      database: 'passport_local_knex_test',
      user: 'node_user',
      password: 'eztoforget',
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN,
      max: process.env.DATABASE_POOL_MAX,
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
}
