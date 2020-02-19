import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { testRequirementsCatDReducer } from './test-requirements/test-requirements.cat-d.reducer';
import { vehicleChecksCatDReducer } from './vehicle-checks/vehicle-checks.cat-d.reducer';
import { safetyQuestionsCatDReducer } from './safety-questions/safety-questions.cat-d.reducer';
import { uncoupleRecoupleCatD1EReducer } from './uncouple-recouple/uncouple-recouple.cat-d1e.reducer';
import { manoeuvresReducer } from '../common/manoeuvres/manoeuvres.reducer';

export const initialState: CatD1EUniqueTypes.TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  manoeuvres: {},
  seriousFaults: {},
  testRequirements: {},
  ETA: {},
  eco: {},
  vehicleChecks: {
    tellMeQuestions: [],
    showMeQuestions: [],
  },
  safetyQuestions: {
    questions: [],
  },
  uncoupleRecouple: {},
};

export function testDataCatD1EReducer(
  state: CatD1EUniqueTypes.TestData,
  action: Action,
): Required<CatD1EUniqueTypes.TestData> {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatDReducer,
    safetyQuestions: safetyQuestionsCatDReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    manoeuvres: manoeuvresReducer,
    testRequirements: testRequirementsCatDReducer,
    uncoupleRecouple: uncoupleRecoupleCatD1EReducer,
    // TODO - Cat D - To be implmented by relevant ticket MES-4129
    pcvDoorExercise: () => { return null; },
  })(state as Required<CatD1EUniqueTypes.TestData>, action);
}

export const getTestData = createFeatureSelector<CatD1EUniqueTypes.TestData>('testData');
