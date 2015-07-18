var helper = require(__dirname + '/../test-helper')
var Models = require(__dirname + '/../../app/models/index')
var fixturesSetup = require(__dirname + '/../fixtures/setup')

describe('Model - Nation', function() {

  var Nation = Models.Nation

  before(function(done) {
    fixturesSetup.resetFixtures([
      {
        model: 'Nation',
        data: {
          id: 4,
          name: 'default'
        }
      },
      {
        model: 'User',
        data: {
          id: 4,
          email: 'default@test.com',
          name: 'default'
        }
      },
      {
        model: 'Citizenship',
        data: {
          userId: 4,
          nationId: 4
        }
      }
    ],
    done)
  })

  it('should require a name', function(done) {
    Nation.build().validate().then(
      function(validate) {
        assert.equal(validate.errors.length, 2)
        assert(_.findWhere(validate.errors, {path: 'name'}))
        done()
      }
    )
  })

  it('should set createdAt and updatedAt', function(done) {
    Nation.create({name: 'Canada'}).then(
      function(nation) {
        assert(nation.createdAt)
        assert(nation.updatedAt)
        done()
      }
    )
  })

  it('should validate the uniqueness of name', function(done) {
    Nation.create({name: 'Toronto'}).then(function() {
      Nation.create({name: 'Toronto'}).catch(function(validate) {
        assert(_.findWhere(validate.errors, {path: 'name', message: 'Name already taken'}))
        done()
      })
    })
  })

  it('should find a nation with citizenships', function(done) {
    Nation.findOne({name: 'default'}).then(function(nation) {
      nation.getCitizenships().then(function(citizenships) {
        assert.equal(citizenships[0].userId, 4)
        assert.equal(citizenships[0].nationId, 4)
        done()
      })
    })
  })

})