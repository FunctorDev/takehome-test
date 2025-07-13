import { Injectable } from '@nestjs/common';
import * as hl7parser from 'hl7parser';

@Injectable()
export class MSHSegmentProvider {
  parse(node: hl7parser.Node) {
    return {
      sendingApplication: node.get('MSH.3').toString(),
    };
  }
}
