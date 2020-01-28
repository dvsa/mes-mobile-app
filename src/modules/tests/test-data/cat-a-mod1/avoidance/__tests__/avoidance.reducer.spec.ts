
import { initialState, avoidanceReducer } from '../avoidance.reducer';
import * as avoidanceActions from '../avoidance.actions';
import { Avoidance } from '@dvsa/mes-test-schema/categories/AM1';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';

describe('avoidance reducer', () => {
  describe('handle ToggleEmergencyStopSpeedReq', () => {
    it('should toggle speedNotMetSeriousFault to true', () => {
      const state = { ...initialState };
      const action = new avoidanceActions.ToggleAvoidanceSpeedReq();
      const result = avoidanceReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        speedNotMetSeriousFault: true,
      } as Avoidance);
    });

    it('should toggle speedNotMetSeriusFault to false', () => {
      const state = {
        ...initialState,
        speedNotMetSeriousFault: true,
      };
      const action = new avoidanceActions.ToggleAvoidanceSpeedReq();
      const result = avoidanceReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        speedNotMetSeriousFault: false,
      } as Avoidance);
    });
  });

  describe('handle RecordAvoidanceFirstAttempt', () => {
    it('should set the firstAttempt to attemptedSpeed', () => {
      const state = { ...initialState };
      const attemptedSpeed = 48;
      const action = new avoidanceActions.RecordAvoidanceFirstAttempt(attemptedSpeed);
      const result = avoidanceReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        firstAttempt: attemptedSpeed,
      } as Avoidance);
    });
  });

  describe('handle RecordAvoidanceSecondAttempt', () => {
    it('should set the secondAttempt to attemptedSpeed', () => {
      const state = { ...initialState };
      const attemptedSpeed = 48;
      const action = new avoidanceActions.RecordAvoidanceSecondAttempt(attemptedSpeed);
      const result = avoidanceReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        secondAttempt: attemptedSpeed,
      } as Avoidance);
    });
  });

  describe('handle AddAvoidanceRidingFault', () => {
    it('should add a riding fault', () => {
      const state = { ...initialState };
      const action = new avoidanceActions.AddAvoidanceRidingFault();
      const result = avoidanceReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        outcome: CompetencyOutcome.DF,
      } as Avoidance);
    });
  });

  describe('handle AddAvoidanceSeriousFault', () => {
    it('should add a serious fault', () => {
      const state = { ...initialState };
      const action = new avoidanceActions.AddAvoidanceSeriousFault();
      const result = avoidanceReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        outcome: CompetencyOutcome.S,
      } as Avoidance);
    });
  });

  describe('handle AddAvoidanceDangerousFault', () => {
    it('should add a riding fault', () => {
      const state = { ...initialState };
      const action = new avoidanceActions.AddAvoidanceDangerousFault();
      const result = avoidanceReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        outcome: CompetencyOutcome.D,
      } as Avoidance);
    });
  });

  describe('handle RemoveAvoidanceFault', () => {
    it('shoud remove any fault from the outcome', () => {
      const state = {
        ...initialState,
        outcome: CompetencyOutcome.DF,
      } as Avoidance;
      const action = new avoidanceActions.RemoveAvoidanceFault();
      const result = avoidanceReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        outcome: undefined,
      } as Avoidance);
    });
  });
});
