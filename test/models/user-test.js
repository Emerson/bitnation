var helper = require(__dirname + '/../test-helper')
var Models = require(__dirname + '/../../app/models/index')

describe('Model - User', function() {

  var User = Models.User

  before(function(done) {
    User.sync({force: true}).then(
      function() {
        done(null)
      }
    )
  })

  it('should require an email and name', function(done) {
    User.build().validate().then(
      function(validate) {
        assert.equal(validate.errors.length, 4)
        assert(_.findWhere(validate.errors, {path: 'name'}))
        assert(_.findWhere(validate.errors, {path: 'email'}))
        done()
      }
    )
  })

  it('should require a valid email address', function(done) {
    User.build({email: 'INVALID'}).validate().then(
      function(validate) {
        assert(_.findWhere(validate.errors), {path: 'email'})
        done()
      }
    )
  })

  it('should set createdAt and updatedAt', function(done) {
    User.create({email: 'test@test.com', name: 'Test Test'}).then(
      function(user) {
        assert(user.createdAt)
        assert(user.updatedAt)
        done()
      }
    )
  })

  it('should validate the uniqueness of email address', function(done) {
    User.create({email: 'dup@dup.com', name: 'Dup'}).then(function() {
      User.create({email: 'dup@dup.com', name: 'Dup'}).catch(function(validate) {
        assert(_.findWhere(validate.errors, {path: 'email', message: 'Email already taken'}))
        done()
      })
    })
  })

})