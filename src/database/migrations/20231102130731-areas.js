'use strict';
const { DataTypes } = require('sequelize')
const { TABLE_NAME } = require('./../models/areas.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoincrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      observations: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

      },
      status: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME)
  }
};
