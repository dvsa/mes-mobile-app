import { Injectable } from '@angular/core';
import { gunzipSync } from 'zlib';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

@Injectable()
export class CompressionProvider {

  constructor() {}
  // TODO: This method has tight coupling with category B
  // We will need to adjust it when we introduce new categories
  extractTestResult(compressedData: string): CatBUniqueTypes.TestResult {
    const gzippedBytes = Buffer.from(compressedData, 'base64');
    const unzippedJson = gunzipSync(gzippedBytes).toString();
    return JSON.parse(unzippedJson) as CatBUniqueTypes.TestResult;
  }

  extractTestSlotResult(compressedData: string): TestSlot {
    const gzippedBytes = Buffer.from(compressedData, 'base64');
    const unzippedJson = gunzipSync(gzippedBytes).toString();
    return JSON.parse(unzippedJson) as TestSlot;
  }

}
