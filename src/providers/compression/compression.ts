import { Injectable } from '@angular/core';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { gunzipSync } from 'zlib';
import { TestSlot } from '@dvsa/mes-journal-schema';

@Injectable()
export class CompressionProvider {

  constructor() {}

  extractCatBTestResult(compressedData: string): StandardCarTestCATBSchema {
    const gzippedBytes = Buffer.from(compressedData, 'base64');
    const unzippedJson = gunzipSync(gzippedBytes).toString();
    return JSON.parse(unzippedJson) as StandardCarTestCATBSchema;
  }

  extractTestSlotResult(compressedData: string): TestSlot {
    const gzippedBytes = Buffer.from(compressedData, 'base64');
    const unzippedJson = gunzipSync(gzippedBytes).toString();
    return JSON.parse(unzippedJson) as TestSlot;
  }

}
