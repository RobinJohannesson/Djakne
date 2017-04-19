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
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Subcategory,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  });

  return Category;
};