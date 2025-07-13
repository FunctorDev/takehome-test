import { Injectable } from '@nestjs/common';
import { parse } from 'date-fns';
import * as hl7parser from 'hl7parser';

@Injectable()
export class PIDSegmentProvider {
  parseDateTimeOfBirth(node: hl7parser.Node) {
    const value = node.get('PID.7').toString();

    return value ? parse(value, 'yyyyMMdd', new Date()) : value;
  }

  parse(node: hl7parser.Node) {
    return {
      setId: node.get('PID.1').toString(),
      patientIdentifierList: {
        idNumber: node.get('PID.3.1').toString(),
        identifierCheckDigit: node.get('PID.3.2').toString(),
        checkDigitScheme: node.get('PID.3.3').toString(),
        assigningAuthority: {
          namespaceId: node.get('PID.3.4.1').toString(),
          universalId: node.get('PID.3.4.2').toString(),
          universalIdType: node.get('PID.3.4.3').toString(),
        },
      },
      patientName: {
        familyName: node.get('PID.5.1').toString(),
        givenName: node.get('PID.5.2').toString(),
        prefix: node.get('PID.5.5').toString(),
      },
      dateTimeOfBirth: this.parseDateTimeOfBirth(node),
      administrativeSex: node.get('PID.8').toString(),
    };
  }
}
