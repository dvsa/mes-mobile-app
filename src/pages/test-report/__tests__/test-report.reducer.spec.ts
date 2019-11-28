import { testReportReducer, initialState } from '../test-report.reducer';
import {
  ToggleSeriousFaultMode,
  ToggleDangerousFaultMode,
  ValidateEta} from '../test-report.actions';

describe('TestReportReducer reducer', () => {
  describe('TOGGLE_SERIOUS_FAULT_MODE', () => {
    it('should enable serious fault mode', () => {
      const result = testReportReducer(initialState, new ToggleSeriousFaultMode());
      expect(result.seriousMode).toEqual(true);
    });
    it('should disable serious fault mode', () => {
      const state = {
         ...initialState,
        seriousMode: true,
      };
      const result = testReportReducer(state, new ToggleSeriousFaultMode());
      expect(result.seriousMode).toEqual(false);
    });
  });
  describe('TOGGLE_DANGEROUS_FAULT_MODE', () => {
    it('should enable dangerous fault mode', () => {
      const result = testReportReducer(initialState, new ToggleDangerousFaultMode());
      expect(result.dangerousMode).toEqual(true);
    });
    it('should disable dangerous fault mode', () => {
      const state = {
         ...initialState,
        dangerousMode: true,
      };
      const result = testReportReducer(state, new ToggleDangerousFaultMode());
      expect(result.dangerousMode).toEqual(false);
    });
  });
  describe('VALIDATE_ETA', () => {
    it('should update isEtaValid based on the value of a ValidateEta payload', () => {
      const result = testReportReducer(initialState, new ValidateEta(true));
      expect(result.isEtaValid).toEqual(true);
    });
  });
});
