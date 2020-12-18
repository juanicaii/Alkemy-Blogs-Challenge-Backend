const { Sequelize, DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNul: false,
    },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define('Category', attributes, options);
}
