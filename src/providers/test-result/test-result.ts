import { Injectable } from '@angular/core';
import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { TestResult } from './test-result.model';

@Injectable()
export class TestResultProvider {

  calculateCatBTestResult = (testdata: TestData): TestResult => {
    // TODO - This needs to be calculated
    return TestResult.Pass;
  }
}
