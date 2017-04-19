"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    likeAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }, 
  }, {
    classMethods: {
      associate: function(models) {
        Product.belongsTo(models.Subcategory),
        Product.hasMany(models.Comment),
        Product.hasMany(models.Like)
      }
    }
  });

  return Product;
};