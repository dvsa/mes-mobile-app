import { singleFaultCompetenciesReducer, initialState } from '../single-fault-competencies.reducer';
import * as singleFaultCompetencyActions from '../single-fault-competencies.actions';
import { SingleFaultCompetencyConstants } from '../single-fault-competencies.constants';
import { SingleFaultCompetencies } from '@dvsa/mes-test-schema/categories/AM1';

describe('single fault competencies reducer', () => {

  describe('handle SetSingleFaultCompetencyOutcome', () => {
    it('should set the outcome for the specified single fault competency', () => {
      const state: SingleFaultCompetencies = { ...initialState };
      const action = new singleFaultCompetencyActions.SetSingleFaultCompetencyOutcome(
        SingleFaultCompetencyConstants.uTurn, 'DF');
      const result = singleFaultCompetenciesReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        uTurn: 'DF',
      });
    });
  });

  describe('handle remove single fault competency outcome', () => {
    it('should remove the specified single fault competency', () => {
      const state: SingleFaultCompetencies = {
        [SingleFaultCompetencyConstants.uTurn]: 'DF',
        [SingleFaultCompetencyConstants.controlledStop]: 'D',
      };
      const action = new singleFaultCompetencyActions.RemoveSingleFaultCompetencyOutcome(
        SingleFaultCompetencyConstants.controlledStop);
      const result: SingleFaultCompetencies = singleFaultCompetenciesReducer(state, action);
      expect(result).toEqual({
        [SingleFaultCompetencyConstants.uTurn]: 'DF',
      });
    });
  });

  describe('handle add single fault comment', () => {
    it('should add a comment to the specified fault', () => {
      const state: SingleFaultCompetencies = { ...initialState };
      const action = new singleFaultCompetencyActions.AddSingleFaultCompetencyComment(
        SingleFaultCompetencyConstants.controlledStop, 'some controlled stop comments');
      const result: SingleFaultCompetencies = singleFaultCompetenciesReducer(state, action);
      expect(result).toEqual({
        controlledStopComments: 'some controlled stop comments',
      });
    });
  });

});
