import { Injectable } from '@nestjs/common';
import * as hl7parser from 'hl7parser';
import { MSHSegmentProvider } from './msh-segment.provider';
import { defaultTo, modifyPath, pipe, append } from 'ramda';
import { OBXSegmentProvider } from './obx-segment.provider';
import { PIDSegmentProvider } from './pid-segment.provider';

@Injectable()
export class Hl7ParserProvider {
  constructor(
    private readonly mshSegmentProvider: MSHSegmentProvider,
    private readonly obxSegmentProvider: OBXSegmentProvider,
    private readonly pidSegmentProvider: PIDSegmentProvider,
  ) {}

  // TODO: Validate input before parsing, could use joi (https://joi.dev/)
  parse(input: string) {
    const message = hl7parser.create(input);

    const arr = [];
    let workingSegment = null;

    message.forEach((node) => {
      switch (node.name) {
        case 'MSH': {
          if (workingSegment !== null) {
            arr.push(workingSegment);
          } else {
            workingSegment = {
              patientResult: {
                patient: {
                  patientIdentification: {},
                },
                orderObservation: {
                  observation: {
                    observationResult: [],
                  },
                },
              },
            };
          }

          Object.assign(workingSegment, this.mshSegmentProvider.parse(node));

          break;
        }

        case 'PID': {
          workingSegment = modifyPath(
            ['patientResult', 'patient', 'patientIdentification'],
            append(this.pidSegmentProvider.parse(node)),
            workingSegment,
          );

          break;
        }

        case 'OBX': {
          workingSegment = modifyPath(
            [
              'patientResult',
              'orderObservation',
              'observation',
              'observationResult',
            ],
            append(this.obxSegmentProvider.parse(node)),
            workingSegment,
          );

          break;
        }
      }
    });

    if (workingSegment !== null) {
      arr.push(workingSegment);
    }

    return arr;
  }
}
