import { testReportReducer, initialState } from '../test-report.reducer';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../test-report.actions';

describe('TestReportReducer reducer', () => {
  describe('TOGGLE_SERIOUS_FAULT_MODE', () => {
    it('should enable serious fault mode', () => {
      const result = testReportReducer(initialState, new ToggleSeriousFaultMode());
      expect(result.seriousMode).toBeTruthy();
    });
    it('should disable serious fault mode', () => {
      const state = {
         ...initialState,
        seriousMode: true,
      };
      const result = testReportReducer(state, new ToggleSeriousFaultMode());
      expect(result.seriousMode).toBeFalsy();
    });
  });
  describe('TOGGLE_DANGEROUS_FAULT_MODE', () => {
    it('should enable dangerous fault mode', () => {
      const result = testReportReducer(initialState, new ToggleDangerousFaultMode());
      expect(result.dangerousMode).toBeTruthy();
    });
    it('should disable dangerous fault mode', () => {
      const state = {
         ...initialState,
        dangerousMode: true,
      };
      const result = testReportReducer(state, new ToggleDangerousFaultMode());
      expect(result.dangerousMode).toBeFalsy();
    });
  });
});
