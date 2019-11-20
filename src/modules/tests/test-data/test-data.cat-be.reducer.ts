import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from './dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from './driving-faults/driving-faults.reducer';
import { ecoReducer } from './eco/eco.reducer';
import { etaReducer } from './eta/eta.reducer';
import { eyesightTestReducer } from './eyesight-test/eyesight-test.reducer';
import { manoeuvresCatBEReducer } from './manoeuvres/manoeuvres.cat-be.reducer';
import { seriousFaultsReducer } from './serious-faults/serious-faults.reducer';
import { vehicleChecksCatBEReducer } from './vehicle-checks/vehicle-checks.cat-be.reducer';
import { testRequirementsCatBEReducer } from './test-requirements/test-requirements.cat-be.reducer';
import { uncoupleRecoupleReducer } from './uncouple-recouple/uncouple-recouple.reducer';

export const initialState: CatBEUniqueTypes.TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  manoeuvres: {},
  seriousFaults: {},
  testRequirements: {},
  ETA: {},
  eco: {},
  eyesightTest: {},
  vehicleChecks: {
    tellMeQuestions: [],
    showMeQuestions: [],
  },
};

export function testDataCatBEReducer(
  state: CatBEUniqueTypes.TestData,
  action: Action,
): CatBEUniqueTypes.TestData {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatBEReducer,
    uncoupleRecouple: uncoupleRecoupleReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    eyesightTest: eyesightTestReducer,
    manoeuvres: manoeuvresCatBEReducer,
    testRequirements: testRequirementsCatBEReducer,
  })(state as Required<CatBEUniqueTypes.TestData>, action);
}

export const getTestData = createFeatureSelector<CatBEUniqueTypes.TestData>('testData');
