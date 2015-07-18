function defineCitizenship(sequelize, DataTypes) {

  var attributes = {}

  var settings = {
    tableName: 'citizenships',
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User, {
          foreignKey: 'userId'
        })
        this.belongsTo(models.Nation, {
          foreignKey: 'nationId'
        })
      }
    }
  }

  return sequelize.define('Citizenship', attributes, settings)

}

module.exports = defineCitizenship