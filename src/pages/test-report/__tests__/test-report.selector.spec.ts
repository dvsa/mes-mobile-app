import { TestReportModel } from '../test-report.model';
import { isSeriousMode, isDangerousMode, isEtaValid } from '../test-report.selector';

describe('TestReportSelectors', () => {
  const state: TestReportModel = {
    seriousMode: true,
    dangerousMode: true,
    removeFaultMode: true,
    isEtaValid: true,
  };

  describe('isSeriousMode', () => {
    it('should return true if the test report is in serious mode', () => {
      expect(isSeriousMode(state)).toEqual(true);
    });
  });
  describe('isDangerousMode', () => {
    it('should return true if the test report is in dangerous mode', () => {
      expect(isDangerousMode(state)).toEqual(true);
    });
  });
  describe('isEtaValid', () => {
    it('should return true if the eta conditions are valid', () => {
      expect(isEtaValid(state)).toEqual(true);
    });
  });
});
