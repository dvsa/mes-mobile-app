import { TestReportModel } from '../test-report.model';
import { isSeriousMode, isDangerousMode, isLegalRequirementsValid, isEtaValid } from '../test-report.selector';

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
  describe('isEtaValid', () => {
    it('should return true if the eta conditions are valid', () => {
      expect(isEtaValid(state)).toBe(true);
    });
  });
});
