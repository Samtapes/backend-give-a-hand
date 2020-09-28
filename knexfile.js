// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
    seeds: {directory: './src/database/seeds'}
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'give-a-hand-database',
      user:     'samtapes',
      password: '011203'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
    seeds: {directory: './src/database/seeds'}
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'give-a-hand-database',
      user:     'samtapes',
      password: '011203'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
    seeds: {directory: './src/database/seeds'}
  }

};
