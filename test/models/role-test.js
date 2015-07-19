var helper = require(__dirname + '/../test-helper')
var Models = require(__dirname + '/../../app/models/index')
var fixturesSetup = require(__dirname + '/../fixtures/setup')

describe('Model - Role', function() {

  var Role = Models.Role

  before(function(done) {
    fixturesSetup.resetFixtures([
      {
        model: 'Nation',
        data: {
          id: 1,
          name: 'default'
        }
      },
      {
        model: 'Role',
        data: {
          id: 1,
          nationId: 1,
          name: 'default',
          type: 'default'
        }
      }
    ], done)
  })

  it('validates the presence of name and type', function(done) {
    Role.build().validate().then(
      function(validate) {
        assert.equal(validate.errors.length, 3)
        assert(_.findWhere(validate.errors, {path: 'name'}))
        assert(_.findWhere(validate.errors, {path: 'type'}))
        done()
      }
    )
  })

  it('belongs to a nation', function(done) {
    Role.findById(1).then(function(role) {
      role.getNation().then(function(nation) {
        assert.equal(nation.id, 1)
        assert.equal(role.nationId, 1)
        done()
      })
    })
  })

})