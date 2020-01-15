import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { manoeuvresCatCReducer } from './manoeuvres/manoeuvres.cat-c.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { testRequirementsCatCReducer } from './test-requirements/test-requirements.cat-c.reducer';
import { vehicleChecksCatCEReducer } from './vehicle-checks/vehicle-checks.cat-ce.reducer';
import { uncoupleRecoupleCatCEReducer } from './uncouple-recouple/uncouple-recouple.cat-ce.reducer';

export const initialState: CatCEUniqueTypes.TestData = {
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
  uncoupleRecouple: {},
};

export function testDataCatCEReducer(
  state: CatCEUniqueTypes.TestData,
  action: Action,
): CatCEUniqueTypes.TestData {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatCEReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    manoeuvres: manoeuvresCatCReducer,
    testRequirements: testRequirementsCatCReducer,
    uncoupleRecouple: uncoupleRecoupleCatCEReducer,
  })(state as Required<CatCEUniqueTypes.TestData>, action);
}

export const getTestData = createFeatureSelector<CatCEUniqueTypes.TestData>('testData');
