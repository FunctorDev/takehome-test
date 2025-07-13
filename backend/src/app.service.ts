import { Injectable } from '@nestjs/common';
import { Hl7ParserProvider } from './modules/hl7-parser/hl7-parser.provider';

@Injectable()
export class AppService {
  constructor(private readonly hl7ParserProvider: Hl7ParserProvider) {}

  calculate() {
    const data =
      `MSH|^~\\&|MPS|NATA^2133^N|||202307192134+1000||ORU^R01|20230719-1.F.64880|P|2.3|4||NE|AL|AU
PID|1||394255555^^^NATA&2133&N||SMITH^JOHN^^^DR||19700101|M|||EXAMPLE STREET^^TEST SUBURB^VIC^3149^AU||^^^^^^0455555555|^^^^^^|||||4295855555||||||||
PV1|1|O||||||4466067B^SIMPSON^DIDI^^^DR|4466067B^SIMPSON^DIDI^^^DR|||||||||||
ORC|RE||394255555-C-SE-IS^NATA^2133^N||CM|||||||4466067B^SIMPSON^DIDI^^^DR
OBR|1||394255555-C-SE-IS^NATA^2133^N|C-SE-IS^SE-IRON STUDIES^2133||20230530|202306080950+1000||||||general health check +|202306080950+1000||4466067B^SIMPSON^DIDI^^^DR||||LN&394255555||202307192134+1000||CH|F||^^^20230530^^S||
OBX|1|NM|14798-3^S Iron:^LN||8|umol/L^umol/L|5-30||||F|||202306101318
OBX|2|NM|3034-6^S Transferrin:^LN||2.3|g/L^g/L|2.0-3.2||||F|||202306101318
OBX|3|NM|6796-7^Transferrin Saturation:^LN||14|%^%|10-45||||F|||202306101318
OBX|4|NM|2276-4^S Ferritin:^LN||135|ng/mL^ng/mL|30-500||||F|||202306101318
OBX|5|FT|C010^SE-IRON STUDIES^2133||||||||F|||202306101318
OBX|6|FT|C010^SE-IRON STUDIES^2133||Dept. Supervising Pathologist:Dr Andrew Carter||||||F|||202306101318
OBX|7|FT|C010^SE-IRON STUDIES^2133||Tests Completed:  HEPATITIS INFO,IS,FLS,CA,TSH,EUC,LFT,PHOS,GF,CRP,VITD,FOL,B12,MG,ACR, A1C,HEPB-NSI,HIV NSI,FBE,ESR,HEPC-NSI||||||F|||202306101318
OBX|8|FT|C010^SE-IRON STUDIES^2133||Tests Pending  : ||||||F|||202306101318
OBX|9|FT|C010^SE-IRON STUDIES^2133||Sample Pending : ||||||F|||202306101318
MSH|^~\\&|MPS|NATA^2133^N|||202307192134+1000||ORU^R01|20230719-2.F.64881|P|2.3|4||NE|AL|AU
PID|1||394255555^^^NATA&2133&N||SMITH^JOHN^^^DR||19700101|M|||EXAMPLE STREET^^TEST SUBURB^VIC^3149^AU||^^^^^^0455555555|^^^^^^|||||4295855555||||||||
PV1|1|O||||||4466067B^SIMPSON^DIDI^^^DR|4466067B^SIMPSON^DIDI^^^DR|||||||||||
ORC|RE||394255555-C-SE-FLS^NATA^2133^N||CM|||||||4466067B^SIMPSON^DIDI^^^DR
OBR|1||394255555-C-SE-FLS^NATA^2133^N|C-SE-FLS^SE-LIPID - HDL/LDL^2133||20230530|202306080950+1000||||||general health check +|202306080950+1000||4466067B^SIMPSON^DIDI^^^DR||||LN&394255555||202307192134+1000||CH|F||^^^20230530^^S||
OBX|1|NM|14647-2^S Cholesterol:^LN||4.4|mmol/L^mmol/L|3.5-5.5||||F|||202306101318
OBX|2|NM|14927-8^S Triglycerides:^LN||0.5|mmol/L^mmol/L|<1.5||||F|||202306101318
OBX|3|NM|14646-4^S HDL-Cholesterol:^LN||1.32|mmol/L^mmol/L|>1.00||||F|||202306101318
OBX|4|NM|22748-8^S LDL-Cholesterol:^LN||2.9|mmol/L^mmol/L|<3.5||||F|||202306101318
OBX|5|NM|9830-1^Chol/HDLC^LN||3.3| ^ |<4.5||||F|||202306101318
OBX|6|NM|Non HDLC^Non HDL Cholesterol^2133||3.1|mmol/L^mmol/L|<3.9||||F|||202306101318
OBX|7|FT|C012^SE-LIPID - HDL/LDL^2133||LIPID TARGET LEVELS:\\.br\\The treatment target levels for people at high risk of cardiovascular\\.br\\disease are:\\.br\\Total Cholesterol       <4.0 mmol/L\\.br\\Fasting Triglycerides   <2.0 mmol/L\\.br\\HDL-Cholesterol         >1.00 mmol/L\\.br\\LDL-Cholesterol         <2.5 mmol/L (<1.8 mmol/L if very high risk)\\.br\\Non-HDL Cholesterol     <3.3 mmol/L (<2.5 mmol/L if very high risk)\\.br\\\\.br\\Source: AACB Harmonised Lipid Reporting Guideline - 2018.\\.br\\\\.br\\Risk Calculator available at www.cvdcheck.org.au||||||F|||202306101318
OBX|8|FT|C012^SE-LIPID - HDL/LDL^2133||||||||F|||202306101318
OBX|9|FT|C012^SE-LIPID - HDL/LDL^2133||Dept. Supervising Pathologist:Dr Andrew Carter||||||F|||202306101318
OBX|10|FT|C012^SE-LIPID - HDL/LDL^2133||Tests Completed:  HEPATITIS INFO,IS,FLS,CA,TSH,EUC,LFT,PHOS,GF,CRP,VITD,FOL,B12,MG,ACR, A1C,HEPB-NSI,HIV NSI,FBE,ESR,HEPC-NSI||||||F|||202306101318
OBX|11|FT|C012^SE-LIPID - HDL/LDL^2133||Tests Pending  : ||||||F|||202306101318
OBX|12|FT|C012^SE-LIPID - HDL/LDL^2133||Sample Pending : ||||||F|||202306101318`.replace(
        /\n/g,
        '\r',
      );

    return this.hl7ParserProvider.parse(data);
  }
}
