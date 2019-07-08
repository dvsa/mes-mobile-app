import { Injectable } from '@angular/core';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { gunzipSync } from 'zlib';

@Injectable()
export class CompressionProvider {

  constructor() {}

  extractCatBTestResult(compressedData: string) : StandardCarTestCATBSchema {
    const gzippedBytes = Buffer.from(compressedData, 'base64');
    const unzippedJson = gunzipSync(gzippedBytes).toString();
    return JSON.parse(unzippedJson) as StandardCarTestCATBSchema;
  }

}
