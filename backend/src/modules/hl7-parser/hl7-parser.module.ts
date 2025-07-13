import { Module } from '@nestjs/common';
import { Hl7ParserProvider } from './hl7-parser.provider';
import { MSHSegmentProvider } from './msh-segment.provider';
import { OBXSegmentProvider } from './obx-segment.provider';
import { PIDSegmentProvider } from './pid-segment.provider';

@Module({
  imports: [],
  providers: [
    Hl7ParserProvider,
    MSHSegmentProvider,
    OBXSegmentProvider,
    PIDSegmentProvider,
  ],
  exports: [Hl7ParserProvider],
})
export class Hl7ParserModule {}
