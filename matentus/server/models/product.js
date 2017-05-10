var sequelize = require("sequelize");

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
    supplier: {
      type: DataTypes.STRING,
      allowNull: true
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
    created: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
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