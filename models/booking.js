'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Booking.init({
    journeyDate: DataTypes.DATE,
    journeyTime: DataTypes.TIME,
    busNumber: DataTypes.STRING,
    seatNumber: DataTypes.STRING,
    boardingPoint: DataTypes.STRING,
    endingPoint: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};