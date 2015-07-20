function defineRole(sequelize, DataTypes) {

  var attributes = {
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: true,
        len: [1, 100]
      }
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: true
      }
    }
  }

  var settings = {
    tableName: 'roles',
    classMethods: {
      permissions: {
        nation: [],
        invitation: [],
        requests: []
      },
      associate: function(models) {
        this.belongsTo(models.Nation, {
          foreignKey: 'nationId'
        })
      }
    }
  }

  return sequelize.define('Role', attributes, settings);

}

module.exports = defineRole