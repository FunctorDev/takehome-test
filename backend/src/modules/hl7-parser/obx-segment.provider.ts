import { Injectable } from '@nestjs/common';
import { parse } from 'date-fns';
import * as hl7parser from 'hl7parser';

@Injectable()
export class OBXSegmentProvider {
  parseDateTimeOfTheObservation(node: hl7parser.Node) {
    const dateTimeOfTheObservation = node.get('OBX.14').toString();

    return dateTimeOfTheObservation
      ? parse(dateTimeOfTheObservation, 'yyyyMMddHHmm', new Date())
      : dateTimeOfTheObservation;
  }

  parse(node: hl7parser.Node) {
    return {
      setId: node.get('OBX.1').toString(),
      valueType: node.get('OBX.2').toString(),
      observationIdentifier: {
        identifier: node.get('OBX.3.1').toString(),
        text: node.get('OBX.3.2').toString(),
        nameOfCodingSystem: node.get('OBX.3.3').toString(),
      },
      observationSubId: node.get('OBX.4').toString(),
      observationValue: node.get('OBX.5').toString(),
      units: {
        identifier: node.get('OBX.6.1').toString(),
        text: node.get('OBX.6.2').toString(),
      },
      referencesRange: node.get('OBX.7').toString(),
      observationResultStatus: node.get('OBX.11').toString(),
      dateTimeOfTheObservation: this.parseDateTimeOfTheObservation(node),
    };
  }
}
