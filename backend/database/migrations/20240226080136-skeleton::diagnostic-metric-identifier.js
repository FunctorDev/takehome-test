'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('diagnostic_metric_identifiers', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.DataTypes.ENUM('oru_sonic', 'system'),
        allowNull: false,
      },
      code: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      unit: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('diagnostic_metric_identifiers');
  },
};
