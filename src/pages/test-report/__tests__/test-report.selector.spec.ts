import { TestReportModel } from '../test-report.model';
import { isSeriousMode, isDangerousMode, isLegalRequirementsValid } from '../test-report.selector';

describe('TestReportSelectors', () => {
  const state: TestReportModel = {
    seriousMode: true,
    dangerousMode: true,
    removeFaultMode: true,
    isLegalRequirementsValid: true,
    isEtaValid: true,
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
  describe('isLegalRequirementsValid', () => {
    it('should return true if the legal requirements are valid', () => {
      expect(isLegalRequirementsValid(state)).toBeTruthy();
    });
  });
});
