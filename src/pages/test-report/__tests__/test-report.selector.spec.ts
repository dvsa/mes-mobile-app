import { TestReportModel } from '../test-report.model';
import { isSeriousMode } from '../test-report.selector';

describe('TestReportSelectros', () => {
  const state: TestReportModel = {
    seriousMode: true,
    dangerousMode: true,
    removeFaultMode: true,
  };

  describe('isSeriousMode', () => {
    it('should return if the test report is in serious mode', () => {
      expect(isSeriousMode(state)).toBeTruthy();
    });
  });
});
