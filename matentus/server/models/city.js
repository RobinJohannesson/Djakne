"use strict";

module.exports = function(sequelize, DataTypes) {

  var City = sequelize.define("City", {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        }
    }
  });

  return City;
};