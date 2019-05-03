import { Injectable } from '@angular/core';
import { TestData, ActivityCode } from '@dvsa/mes-test-schema/categories/B';

@Injectable()
export class TestResultProvider {

  calculateCatBTestResult = (testdata: TestData): ActivityCode => {
    // TODO - This needs to be calculated
    return '1';
  }
}
