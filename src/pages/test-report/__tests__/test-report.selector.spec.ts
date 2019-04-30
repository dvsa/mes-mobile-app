import { TestReportModel } from '../test-report.model';
import { isSeriousMode, isDangerousMode } from '../test-report.selector';

describe('TestReportSelectors', () => {
  const state: TestReportModel = {
    seriousMode: true,
    dangerousMode: true,
    removeFaultMode: true,
    isValid: true,
  };

  describe('isSeriousMode', () => {
    it('should return if the test report is in serious mode', () => {
      expect(isSeriousMode(state)).toBeTruthy();
    });
  });
  describe('isDangerousMode', () => {
    it('should return if the test report is in dangerous mode', () => {
      expect(isDangerousMode(state)).toBeTruthy();
    });
  });
});
