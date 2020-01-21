import {
  initialState,
  vehicleChecksCatAMod2Reducer,
} from '../vehicle-checks.cat-a-mod2.reducer';
import {
  SafetyQuestionSelected,
  SafetyQuestionOutcomeChanged,
  BalanceQuestionSelected,
  BalanceQuestionOutcomeChanged,
} from '../vehicle-checks.cat-a-mod2.actions';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { SafetyAndBalanceQuestions } from '@dvsa/mes-test-schema/categories/AM2';
import { cloneDeep } from 'lodash';

describe('Vehicle Checks Cat A Mod2 Reducer', () => {

  describe('SAFETY_QUESTION_SELECTED', () => {
    it('should add the safety question in the payload to the array at the specified index', () => {
      const newQuestionPayload: QuestionResult = {
        code: 'S1',
        description: 'desc',
      };
      const state: SafetyAndBalanceQuestions = cloneDeep(initialState);
      const result = vehicleChecksCatAMod2Reducer(state, new SafetyQuestionSelected(newQuestionPayload, 1));
      expect(result.safetyQuestions[1].code).toEqual('S1');
      expect(result.safetyQuestions[1].description).toEqual('desc');
    });
  });

  describe('SAFETY_QUESTION_OUTCOME_CHANGED', () => {
    it('should update the outcome property for the object at the specified index', () => {
      const state: SafetyAndBalanceQuestions = cloneDeep(initialState);
      state.safetyQuestions[1] = {
        code: 'S1',
        description: 'desc',
        outcome: 'P',
      };
      const result = vehicleChecksCatAMod2Reducer(state, new SafetyQuestionOutcomeChanged('DF', 1));
      expect(result.safetyQuestions[1].outcome).toEqual('DF');
    });
  });

  describe('BALANCE_QUESTION_SELECTED' , () => {
    it('should add the balance question in the payload to the array at the specified index', () => {
      const newQuestionPayload: QuestionResult = {
        code: 'B01',
        description: 'desc',
      };
      const state: SafetyAndBalanceQuestions = cloneDeep(initialState);
      const result = vehicleChecksCatAMod2Reducer(state, new BalanceQuestionSelected(newQuestionPayload, 1));
      expect(result.balanceQuestions[1].code).toEqual('B01');
      expect(result.balanceQuestions[1].description).toEqual('desc');
    });
  });

  describe('BALANCE_QUESTION_OUTCOME_CHANGED' , () => {
    it('should update the outcome property for the object at the specified index', () => {
      const state: SafetyAndBalanceQuestions = cloneDeep(initialState);
      state.balanceQuestions[1] = {
        code: 'B01',
        description: 'desc',
        outcome: 'P',
      };
      const result = vehicleChecksCatAMod2Reducer(state, new BalanceQuestionOutcomeChanged('DF', 1));
      expect(result.balanceQuestions[1].outcome).toEqual('DF');
    });
  });
});
