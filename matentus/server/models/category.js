"use strict";

module.exports = function(sequelize, DataTypes) {

  var Category = sequelize.define("Category", {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Product) 
        }
    }
  });

  return Category;
};