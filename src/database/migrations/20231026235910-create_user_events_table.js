'use strict';
const { DataTypes } = require('sequelize')
const { TABLE_NAME } = require('../models/user_events.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoincrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      event_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'events',
          key: 'id'
        }
      }

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME)
  }
};
