import { singleFaultCompetenciesReducer, initialState } from '../single-fault-competencies.reducer';
import * as singleFaultCompetencyActions from '../single-fault-competencies.actions';
import { SingleFaultCompetencies } from '../single-fault-competencies.constants';

fdescribe('single fault competencies reducer', () => {
  describe('handle SetSingleFaultCompetencyOutcome', () => {


    it('should set the outcome for the specified sing fault competency', () => {
      const state = { ...initialState };
      const action = new singleFaultCompetencyActions.SetSingleFaultCompetencyOutcome(SingleFaultCompetencies.uTurn, 'DF');
      const result = singleFaultCompetenciesReducer(state, action);
      expect(result).toEqual({
        ...initialState,
        uTurn: 'DF'
      })
    });


  });
});
