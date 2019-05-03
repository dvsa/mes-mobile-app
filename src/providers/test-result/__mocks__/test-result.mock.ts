import { TestResult } from '../test-result.model';

export class TestResultProviderMock {
  calculateCatBTestResult = jasmine.createSpy('calculateCatBTestResult').and.returnValue(TestResult.Pass);
}
