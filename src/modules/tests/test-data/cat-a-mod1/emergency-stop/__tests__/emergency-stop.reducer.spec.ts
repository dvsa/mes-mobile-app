
import { initialState, emergencyStopReducer } from '../emergency-stop.reducer';
import * as emergencyStopActions from '../emergency-stop.actions';
import { EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';

describe('emergency stop reducer', () => {
  describe('handle ToggleEmergencyStopSpeedReq', () => {
    it('should toggle speedNotMetSeriousFault to true', () => {
      const state = { ...initialState };
      const action = new emergencyStopActions.ToggleEmergencyStopSpeedReq();
      const result = emergencyStopReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        speedNotMetSeriousFault: true,
      } as EmergencyStop);
    });

    it('should toggle speedNotMetSeriusFault to false', () => {
      const state = {
        ...initialState,
        speedNotMetSeriousFault: true,
      };
      const action = new emergencyStopActions.ToggleEmergencyStopSpeedReq();
      const result = emergencyStopReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        speedNotMetSeriousFault: false,
      } as EmergencyStop);
    });
  });

  describe('handle RecordEmergencyStopFirstAttempt', () => {
    it('should set the firstAttempt to attemptedSpeed', () => {
      const state = { ...initialState };
      const attemptedSpeed = 48;
      const action = new emergencyStopActions.RecordEmergencyStopFirstAttempt(attemptedSpeed);
      const result = emergencyStopReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        firstAttempt: attemptedSpeed,
      } as EmergencyStop);
    });
  });

  describe('handle RecordEmergencyStopSecondAttempt', () => {
    it('should set the secondAttempt to attemptedSpeed', () => {
      const state = { ...initialState };
      const attemptedSpeed = 48;
      const action = new emergencyStopActions.RecordEmergencyStopSecondAttempt(attemptedSpeed);
      const result = emergencyStopReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        secondAttempt: attemptedSpeed,
      } as EmergencyStop);
    });
  });

  describe('handle AddEmergencyStopRidingFault', () => {
    it('should add a riding fault', () => {
      const state = { ...initialState };
      const action = new emergencyStopActions.AddEmergencyStopRidingFault();
      const result = emergencyStopReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        outcome: CompetencyOutcome.DF,
      } as EmergencyStop);
    });
  });

  describe('handle AddEmergencyStopSeriousFault', () => {
    it('should add a serious fault', () => {
      const state = { ...initialState };
      const action = new emergencyStopActions.AddEmergencyStopSeriousFault();
      const result = emergencyStopReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        outcome: CompetencyOutcome.S,
      } as EmergencyStop);
    });
  });

  describe('handle AddEmergencyStopDangerousFault', () => {
    it('should add a riding fault', () => {
      const state = { ...initialState };
      const action = new emergencyStopActions.AddEmergencyStopDangerousFault();
      const result = emergencyStopReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        outcome: CompetencyOutcome.D,
      } as EmergencyStop);
    });
  });

  describe('handle RemoveEmergencyStopFault', () => {
    it('shoud remove any fault from the outcome', () => {
      const state = {
        ...initialState,
        outcome: CompetencyOutcome.DF,
      } as EmergencyStop;
      const action = new emergencyStopActions.RemoveEmergencyStopFault();
      const result = emergencyStopReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        outcome: undefined,
      } as EmergencyStop);
    });
  });
});
