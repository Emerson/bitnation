var helper = require(__dirname + '/../test-helper')
var Models = require(__dirname + '/../../app/models/index')

describe('Model - User', function() {

  var User = Models.User

  it('should require an email and name', function(done) {
    User.build().validate().then(
      function(validate) {
        assert.equal(validate.errors.length, 2)
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

})