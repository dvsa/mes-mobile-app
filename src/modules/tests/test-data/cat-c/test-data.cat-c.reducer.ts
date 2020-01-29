import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import {
  dangerousFaultsReducer,
  drivingFaultsReducer,
  seriousFaultsReducer,
  ecoReducer,
  etaReducer,
} from '../common';
import { manoeuvresCatCReducer } from './manoeuvres/manoeuvres.cat-c.reducer';
import { vehicleChecksCatCReducer } from './vehicle-checks/vehicle-checks.cat-c.reducer';
import { testRequirementsCatCReducer } from './test-requirements/test-requirements.cat-c.reducer';

export const initialState: CatCUniqueTypes.TestData = {
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
};

export function testDataCatCReducer(
  state: CatCUniqueTypes.TestData,
  action: Action,
): CatCUniqueTypes.TestData {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatCReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    manoeuvres: manoeuvresCatCReducer,
    testRequirements: testRequirementsCatCReducer,
  })(state as Required<CatCUniqueTypes.TestData>, action);
}

export const getTestData = createFeatureSelector<CatCUniqueTypes.TestData>('testData');
