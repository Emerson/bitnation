function isUniqueEmail(value, next) {
  var self = this
  self.Model.find({where: {email: value}}).then(
    function(user) {
      if(user && self.id !== user.id) {
        throw new Error('Email already taken')
      }
      return next()
    }).catch(function(err) {
      return next(err)
    })
}

function defineUser(sequelize, DataTypes) {

  var attributes = {
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        isEmail: true,
        notEmpty: true,
        isUnique: isUniqueEmail
      }
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: [2, 100],
        notEmpty: true
      }
    }
  }

  var settings = {
    tableName: 'users'
  }

  return sequelize.define('User', attributes, settings);

}

module.exports = defineUser