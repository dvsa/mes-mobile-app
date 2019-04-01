import { testReportReducer, initialState } from '../test-report.reducer';
import { ToggleSeriousFaultMode } from '../test-report.actions';

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
});
