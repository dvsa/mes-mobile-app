import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { manoeuvresCatDReducer } from './manoeuvres/manoeuvres.cat-d.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { vehicleChecksCatDReducer } from './vehicle-checks/vehicle-checks.cat-d.reducer';
import { testRequirementsCatDReducer } from './test-requirements/test-requirements.cat-d.reducer';

export const initialState: CatDUniqueTypes.TestData = {
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

export function testDataCatDReducer(
  state: CatDUniqueTypes.TestData,
  action: Action,
): CatDUniqueTypes.TestData {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatDReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    manoeuvres: manoeuvresCatDReducer,
    testRequirements: testRequirementsCatDReducer,
  })(state as Required<CatDUniqueTypes.TestData>, action);
}

export const getTestData = createFeatureSelector<CatDUniqueTypes.TestData>('testData');
