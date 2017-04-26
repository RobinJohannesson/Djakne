"use strict";

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
    		type: DataTypes.STRING,
    		allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Product),
        Comment.belongsTo(models.User) 
      }
    }
  });

  return Comment;
};