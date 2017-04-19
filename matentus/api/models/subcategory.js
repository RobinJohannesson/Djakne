"use strict";

module.exports = function(sequelize, DataTypes) {
  var Subcategory = sequelize.define("Subcategory", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{ 
      type:DataTypes.STRING,
      allowNull: false
          }
  }, {
    classMethods: {
      associate: function(models) {
       Subcategory.belongsTo(models.Category)          
       
      }
    }
  });

  return Subcategory;
};