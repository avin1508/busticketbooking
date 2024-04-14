'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      journeyDate: {
        type: Sequelize.DATE
      },
      journeyTime: {
        type: Sequelize.TIME
      },
      busNumber: {
        type: Sequelize.STRING
      },
      seatNumber: {
        type: Sequelize.STRING
      },
      boardingPoint: {
        type: Sequelize.STRING
      },
      endingPoint: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};