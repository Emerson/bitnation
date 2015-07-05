/*
*   Only here because Sequelize needs it to be...
*/

var config = require('config')

module.exports = {
  database: config.db.database,
  username: config.db.username,
  password: config.db.password,
  dialect: config.db.dialect,
  host: config.db.host,
  pool: config.db.pool,
  logging: (process.env.NODE_ENV !== 'test')
}