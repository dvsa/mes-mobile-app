import { TestReportModel } from '../test-report.model';
import { isSeriousMode, isDangerousMode, isTestValid } from '../test-report.selector';
import { TestResult } from '../../../providers/test-result/test-result.model';

describe('TestReportSelectors', () => {
  const state: TestReportModel = {
    seriousMode: true,
    dangerousMode: true,
    removeFaultMode: true,
    isValid: true,
    testResult: TestResult.NotCalculated,
  };

  describe('isSeriousMode', () => {
    it('should return true if the test report is in serious mode', () => {
      expect(isSeriousMode(state)).toBeTruthy();
    });
  });
  describe('isDangerousMode', () => {
    it('should return true if the test report is in dangerous mode', () => {
      expect(isDangerousMode(state)).toBeTruthy();
    });
  });
  describe('isTestValid', () => {
    it('should return true if the test is valid', () => {
      expect(isTestValid(state)).toBeTruthy();
    });
  });
});
