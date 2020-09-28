const knex = require('knex');
const configuration = require('../../knexfile');


// const env = process.env.NODE_ENV || 'staging'
const connection = knex(configuration.development);

module.exports = connection;