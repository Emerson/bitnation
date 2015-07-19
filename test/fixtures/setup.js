var Promise = require('bluebird')
var SequelizeFixtures = require('sequelize-fixtures')
var Models = require(__dirname + '/../../app/models/index')

function setupDb() {
  return Models.User.sync({force: true}).then(function() {
    return Models.Nation.sync({force: true})
  }).then(function() {
    return Models.Citizenship.sync({force: true})
  }).then(function() {
    return Models.Role.sync({force: true})
  })
}

function resetFixtures(fixtures, next) {
  setupDb().then(function() {
    SequelizeFixtures.loadFixtures(fixtures, Models).then(function() {
      next()
    })
  }).catch(function(err) {
    throw new Error(err)
  })
}

module.exports = {
  setupDb: setupDb,
  resetFixtures: resetFixtures
}