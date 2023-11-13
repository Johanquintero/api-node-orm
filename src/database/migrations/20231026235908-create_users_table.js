'use strict';
const { DataTypes } = require('sequelize')
const { TABLE_NAME } = require('../models/user.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

      },
      status: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME)
  }
};
