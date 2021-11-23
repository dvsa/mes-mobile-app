import {
  vehicleChecksCatCReducer, generateInitialState,
} from '../vehicle-checks.cat-c.reducer';
import {
  ShowMeQuestionSelected,
  ShowMeQuestionOutcomeChanged,
  TellMeQuestionSelected,
  TellMeQuestionOutcomeChanged, DropExtraVehicleChecksDelegated,
} from '../vehicle-checks.cat-c.action';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { cloneDeep } from 'lodash';

describe('Vehicle Checks Cat C Reducer', () => {

  describe('SHOW_ME_QUESTION_SELECTED', () => {
    it('should add the show me question in the payload to the array at the specified index', () => {
      const newQuestionPayload: QuestionResult = {
        code: 'S1',
        description: 'desc',
      };
      const state: CatCUniqueTypes.VehicleChecks = cloneDeep(generateInitialState());
      const result = vehicleChecksCatCReducer(state, new ShowMeQuestionSelected(newQuestionPayload, 1));
      expect(result.showMeQuestions[1].code).toEqual('S1');
      expect(result.showMeQuestions[1].description).toEqual('desc');
    });
  });

  describe('SHOW_ME_QUESTION_OUTCOME_CHANGED', () => {
    it('should update the outcome property for the object at the specified index', () => {
      const state: CatCUniqueTypes.VehicleChecks = cloneDeep(generateInitialState());
      state.showMeQuestions[1] = {
        code: 'S1',
        description: 'desc',
        outcome: 'P',
      };
      const result = vehicleChecksCatCReducer(state, new ShowMeQuestionOutcomeChanged('DF', 1));
      expect(result.showMeQuestions[1].outcome).toEqual('DF');
    });
  });

  describe('TELL_ME_QUESTION_SELECTED' , () => {
    it('should add the tell me question in the payload to the array at the specified index', () => {
      const newQuestionPayload: QuestionResult = {
        code: 'T01',
        description: 'desc',
      };
      const state: CatCUniqueTypes.VehicleChecks = cloneDeep(generateInitialState());
      const result = vehicleChecksCatCReducer(state, new TellMeQuestionSelected(newQuestionPayload, 1));
      expect(result.tellMeQuestions[1].code).toEqual('T01');
      expect(result.tellMeQuestions[1].description).toEqual('desc');
    });
  });

  describe('TELL_ME_QUESTION_OUTCOME_CHANGED' , () => {
    it('should update the outcome property for the object at the specified index', () => {
      const state: CatCUniqueTypes.VehicleChecks = cloneDeep(generateInitialState());
      state.tellMeQuestions[1] = {
        code: 'T01',
        description: 'desc',
        outcome: 'P',
      };
      const result = vehicleChecksCatCReducer(state, new TellMeQuestionOutcomeChanged('DF', 1));
      expect(result.tellMeQuestions[1].outcome).toEqual('DF');
    });
  });

  describe('VEHICLE_CHECKS_DROP_EXTRA_DLG' , () => {
    it('should move the first showMeQuestions to the tellMeQuestions', () => {
      let state: CatCUniqueTypes.VehicleChecks = cloneDeep(generateInitialState());
      state = {
        ...state,
        tellMeQuestions: [],
        showMeQuestions: [
          { code: 'T01', description: 'desc', outcome: 'P' },
          { code: 'T02', description: 'desc 2', outcome: 'P' },
        ],
      };
      const result = vehicleChecksCatCReducer(state, new DropExtraVehicleChecksDelegated());
      expect(result.showMeQuestions.length).toEqual(1);
      expect(result.tellMeQuestions.length).toEqual(1);
    });
  });
});
