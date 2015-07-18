var helper = require(__dirname + '/../test-helper')
var Models = require(__dirname + '/../../app/models/index')
var fixturesSetup = require(__dirname + '/../fixtures/setup')

describe('Model - Citizenship', function() {
  var Citizenship = Models.Citizenship

  before(function(done) {
    fixturesSetup.resetFixtures([
      {
        model: 'User',
        data: {
          id: 5,
          email: 'default@default.com',
          name: 'default',
        }
      },
      {
        model: 'Nation',
        data: {
          id: 5,
          name: 'default'
        }
      },
      {
        model: 'Citizenship',
        data: {
          userId: 5,
          nationId: 5
        }
      }
    ], done)
  })

  it('belongs to User', function(done) {
    Citizenship.findAll().then(function(citizenship) {
      citizenship[0].getUser().then(function(user) {
        assert.equal(user.id, 5)
        done()
      })
    })
  })

  it('belongs to Nation', function(done) {
    Citizenship.findAll().then(function(citizenship) {
      citizenship[0].getNation().then(function(nation) {
        assert.equal(nation.id, 5)
        done()
      })
    })
  })

})