'use strict';
const { TABLE_NAME } = require('../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE_NAME, 'area_id', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'areas',
        key: 'id'
      }
    })
  },

  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE_NAME, 'area_id', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'areas',
        key: 'id'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE_NAME, 'area_id')
  }
};
