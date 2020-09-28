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
    connection: 'postgres://iysvuamf:LG8mcpoe5sbHf_3MIIgUrg11tpNJVnOM@lallah.db.elephantsql.com:5432/iysvuamf',
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
    connection: 'postgres://iysvuamf:LG8mcpoe5sbHf_3MIIgUrg11tpNJVnOM@lallah.db.elephantsql.com:5432/iysvuamf',
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
