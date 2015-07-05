function defineUser(sequelize, DataTypes) {

  var attributes = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        defaultValue: ''
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
        notEmpty: true,
        defaultValue: ''
      }
    }
  }

  var settings = {
    tableName: 'users'
  }

  var User = sequelize.define('User', attributes, settings)

  return User;

}

module.exports = defineUser