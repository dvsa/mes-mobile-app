import {
  initialState,
  vehicleChecksCatBEReducer,
} from '../vehicle-checks.cat-be.reducer';
import {
  ShowMeQuestionSelected,
  ShowMeQuestionOutcomeChanged,
  TellMeQuestionSelected,
  TellMeQuestionOutcomeChanged}
  from '../vehicle-checks.cat-be.action';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

describe('Vehicle Checks Cat B+E Reducer', () => {

  describe('SHOW_ME_QUESTION_SELECTED' , () => {
    it('should add the show me question in the payload to the array at the specified index', () => {
      const newQuestionPayload: QuestionResult = {
        code: 'S1',
        description: 'desc',
      };
      const state: CatBEUniqueTypes.VehicleChecks = initialState;
      const result = vehicleChecksCatBEReducer(state, new ShowMeQuestionSelected(newQuestionPayload, 1));
      expect(result.showMeQuestions[1].code).toEqual('S1');
      expect(result.showMeQuestions[1].description).toEqual('desc');
    });
  });

  describe('SHOW_ME_QUESTION_OUTCOME_CHANGED' , () => {
    it('should update the outcome property for the object at the specified index', () => {
      const state: CatBEUniqueTypes.VehicleChecks = initialState;
      state.showMeQuestions[1] = {
        code: 'S1',
        description: 'desc',
        outcome: 'P',
      };
      const result = vehicleChecksCatBEReducer(state, new ShowMeQuestionOutcomeChanged('DF', 1));
      expect(result.showMeQuestions[1].outcome).toEqual('DF');
    });
  });

  describe('TELL_ME_QUESTION_SELECTED' , () => {
    it('should add the tell me question in the payload to the array at the specified index', () => {
      const newQuestionPayload: QuestionResult = {
        code: 'T01',
        description: 'desc',
      };
      const state: CatBEUniqueTypes.VehicleChecks = initialState;
      const result = vehicleChecksCatBEReducer(state, new TellMeQuestionSelected(newQuestionPayload, 1));
      expect(result.tellMeQuestions[1].code).toEqual('T01');
      expect(result.tellMeQuestions[1].description).toEqual('desc');
    });
  });

  describe('TELL_ME_QUESTION_OUTCOME_CHANGED' , () => {
    it('should update the outcome property for the object at the specified index', () => {
      const state: CatBEUniqueTypes.VehicleChecks = initialState;
      state.tellMeQuestions[1] = {
        code: 'T01',
        description: 'desc',
        outcome: 'P',
      };
      const result = vehicleChecksCatBEReducer(state, new TellMeQuestionOutcomeChanged('DF', 1));
      expect(result.tellMeQuestions[1].outcome).toEqual('DF');
    });
  });
});
