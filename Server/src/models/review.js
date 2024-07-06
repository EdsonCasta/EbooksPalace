// models/review.js
const { DataTypes } = require("sequelize");

const review = (sequelize) => {
  return sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, { timestamps: true });
};

module.exports = review;
