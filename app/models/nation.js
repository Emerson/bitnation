function isUniqueName(value, next) {
  var self = this
  self.Model.find({where: {name: value}}).then(
    function(user) {
      if(user && self.id !== user.id) {
        throw new Error('Name already taken')
      }
      return next()
    }).catch(function(err) {
      return next(err)
    })
}

function defineNation(sequelize, DataTypes) {

  var attributes = {
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: true,
        isUnique: isUniqueName,
        len: [2, 100]
      }
    }
  }

  var settings = {
    tableName: 'nations',
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Citizenship, {
          foreignKey: 'nationId'
        })
        this.hasMany(models.Role, {
          foreignKey: 'nationId'
        })
      }
    }
  }

  return sequelize.define('Nation', attributes, settings)

}

module.exports = defineNation