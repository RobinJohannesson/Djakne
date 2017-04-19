"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
    		type: DataTypes.STRING,
    		allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Comment),
        User.hasMany(models.Like)
      }
    }
  });

  return User;
};