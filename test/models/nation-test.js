var helper = require(__dirname + '/../test-helper')
var Models = require(__dirname + '/../../app/models/index')

describe('Model - Nation', function() {

  var Nation = Models.Nation

  before(function(done) {
    Nation.sync({force: true}).then(
      function() {
        done(null)
      }
    )
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

})