import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { manoeuvresCatDReducer } from './manoeuvres/manoeuvres.cat-d.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { testRequirementsCatDReducer } from './test-requirements/test-requirements.cat-d.reducer';
import { vehicleChecksCatDReducer } from './vehicle-checks/vehicle-checks.cat-d.reducer';

export const initialState: CatD1UniqueTypes.TestData = {
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

export function testDataCatD1Reducer(
  state: CatD1UniqueTypes.TestData,
  action: Action,
): Required<CatD1UniqueTypes.TestData> {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatDReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    manoeuvres: manoeuvresCatDReducer,
    testRequirements: testRequirementsCatDReducer,
    // TODO - Cat D - To be implmented by relevant tickets
    safetyQuestions: () => { return null; },
    pcvDoorExercise: () => { return null; },
  })(state as Required<CatD1UniqueTypes.TestData>, action);
}

export const getTestData = createFeatureSelector<CatD1UniqueTypes.TestData>('testData');
