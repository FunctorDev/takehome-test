/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { pipe, chain, head } = require('ramda');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const diagnosticMetricsFile = await fs.promises.readFile(
      path.resolve(__dirname, '..', 'data', 'diagnostic_metrics.csv'),
    );

    const listDiagnosticMetricsFromDatabase = await queryInterface.rawSelect(
      'diagnostic_metrics',
      {
        plain: false,
      },
      ['id', 'name'],
    );

    const listDiagnosticMetricsFromCSV = parse(diagnosticMetricsFile, {});

    const records = pipe(
      chain((record) => {
        const csvMetric = listDiagnosticMetricsFromCSV.find(
          ([name]) => name === record.name,
        );

        const oruSonicCodes = csvMetric[1];
        const oruSonicUnits = csvMetric[4];

        if (oruSonicCodes && oruSonicUnits) {
          const listOruSonicCodes = oruSonicCodes.split(';');
          const listOruSonicUnits = oruSonicUnits.split(';');
          const n = Math.max(
            listOruSonicCodes.length,
            listOruSonicUnits.length,
          );

          return Array(n)
            .fill()
            .map((_, index) => {
              const code = listOruSonicCodes[index] || head(listOruSonicCodes);
              const unit = listOruSonicUnits[index] || head(listOruSonicUnits);

              return {
                type: 'oru_sonic',
                code,
                unit,
                diagnostic_metric_id: record.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              };
            });
        }

        return [];
      }),
    )(listDiagnosticMetricsFromDatabase);

    return await queryInterface.bulkInsert(
      'diagnostic_metric_identifiers',
      records,
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('diagnostic_metric_identifiers', null, {});
  },
};
