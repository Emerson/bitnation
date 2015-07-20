var helper = require(__dirname + '/../test-helper')
var Models = require(__dirname + '/../../app/models/index')
var fixturesSetup = require(__dirname + '/../fixtures/setup')
var Promise = require("bluebird")

describe('Model - Nation', function() {

  var Nation = Models.Nation
  var User = Models.User

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

  it('hasCitizen should check if a nation has a citizen', function(done) {
    Promise.props({
      nation: Nation.findOne({name: 'default'}),
      user: User.findOne({name: 'default'})
    }).then(function(res) {
      res.nation.hasCitizen(res.user).then(function(found) {
        assert(found)
        done()
      })
    })
  })

  it('hasCitizen should return false', function(done) {
    Nation.findOne({name: 'default'}).then(function(nation) {
      nation.hasCitizen({id: 2000}).then(function(found) {
        assert(!found)
        done()
      })
    })
  })

})