'use strict';
/* eslint-disable no-unused-vars */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    points: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
		timestamps: false,
  });
  return User;
};