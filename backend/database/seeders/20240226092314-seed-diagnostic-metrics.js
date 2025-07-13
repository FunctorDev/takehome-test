/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const {
  pipe,
  tail,
  map,
  chain,
  update,
  find,
  propEq,
  propOr,
} = require('ramda');
const {
  transformValueFromCsvToArrayOrElse,
  parseNumberOrElse,
} = require('../utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const diagnosticMetricsFile = await fs.promises.readFile(
      path.resolve(__dirname, '..', 'data', 'diagnostic_metrics.csv'),
    );

    const listDiagnosticGroups = await queryInterface.rawSelect(
      'diagnostic_groups',
      {
        plain: false,
      },
      ['id', 'name'],
    );

    const listDiagnostics = await queryInterface.rawSelect(
      'diagnostics',
      {
        plain: false,
      },
      ['id', 'name'],
    );

    const listDiagnosticMetrics = parse(diagnosticMetricsFile, {});

    const records = pipe(
      tail,

      chain((item) => {
        const diagnostics = transformValueFromCsvToArrayOrElse(item[2]);

        if (diagnostics) {
          return diagnostics.map((diagnostic) => {
            const diagnosticId = pipe(
              find(propEq(diagnostic, 'name')),
              propOr(null, 'id'),
            )(listDiagnostics);

            return update(2, diagnosticId, item);
          });
        }

        return [update(2, null, item)];
      }),

      chain((item) => {
        const diagnosticGroups = transformValueFromCsvToArrayOrElse(item[3]);

        if (diagnosticGroups) {
          return diagnosticGroups.map((group) => {
            const groupId = pipe(
              find(propEq(group, 'name')),
              propOr(null, 'id'),
            )(listDiagnosticGroups);

            return update(3, groupId, item);
          });
        }

        return [update(3, null, item)];
      }),

      map(
        ([
          name,
          _,
          diagnostic_id,
          diagnostic_group_id,
          __,
          units,
          min_age,
          max_age,
          gender,
          standard_lower,
          standard_higher,
          everlab_lower,
          everlab_higher,
        ]) => {
          return {
            name,
            diagnostic_id,
            diagnostic_group_id,
            units,
            min_age: parseNumberOrElse(min_age),
            max_age: parseNumberOrElse(max_age),
            gender,
            standard_lower: parseNumberOrElse(standard_lower),
            standard_higher: parseNumberOrElse(standard_higher),
            everlab_lower: parseNumberOrElse(everlab_lower),
            everlab_higher: parseNumberOrElse(everlab_higher),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        },
      ),
    )(listDiagnosticMetrics);

    return await queryInterface.bulkInsert('diagnostic_metrics', records);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('diagnostic_metrics', null, {});
  },
};
