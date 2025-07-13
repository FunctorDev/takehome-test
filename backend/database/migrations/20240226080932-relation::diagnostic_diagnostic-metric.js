'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'diagnostic_metrics',
          'diagnostic_group_id',
          {
            type: Sequelize.DataTypes.INTEGER,
            onDelete: 'SET NULL',
            references: {
              model: 'diagnostic_groups',
              key: 'id',
            },
          },
          {
            transaction: t,
          },
        ),

        queryInterface.addColumn(
          'diagnostic_metrics',
          'diagnostic_id',
          {
            type: Sequelize.DataTypes.INTEGER,
            onDelete: 'SET NULL',
            references: {
              model: 'diagnostics',
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
          'diagnostic_metrics',
          'diagnostic_group_id',
          {
            transaction: t,
          },
        ),

        queryInterface.removeColumn('diagnostics', 'diagnostic_id', {
          transaction: t,
        }),
      ]);
    });
  },
};
