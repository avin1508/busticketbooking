'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Booking, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    isEmailVerified: DataTypes.BOOLEAN,
    emailVerificationOTP: DataTypes.STRING,
    resetPasswordOTP: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};