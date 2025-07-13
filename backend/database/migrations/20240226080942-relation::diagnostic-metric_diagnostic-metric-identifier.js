'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'diagnostic_metric_identifiers',
          'diagnostic_metric_id',
          {
            type: Sequelize.DataTypes.INTEGER,
            onDelete: 'SET NULL',
            allowNull: true,
            references: {
              model: 'diagnostic_metrics',
              key: 'id',
            },
          },
          {
            transaction: t,
          },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(
          'diagnostic_metric_identifiers',
          'diagnostic_metric_id',
          {
            transaction: t,
          },
        ),
      ]);
    });
  },
};
