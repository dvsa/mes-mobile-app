import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { manoeuvresCatCReducer } from './manoeuvres/manoeuvres.cat-c.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { testRequirementsCatCReducer } from './test-requirements/test-requirements.cat-c.reducer';
import { vehicleChecksCatCReducer } from './vehicle-checks/vehicle-checks.cat-c.reducer';
import { uncoupleRecoupleCatC1EReducer } from './uncouple-recouple/uncouple-recouple.cat-c1e.reducer';

export const initialState: CatC1EUniqueTypes.TestData = {
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

export function testDataCatC1EReducer(
  state: CatC1EUniqueTypes.TestData,
  action: Action,
): CatC1EUniqueTypes.TestData {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatCReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    manoeuvres: manoeuvresCatCReducer,
    testRequirements: testRequirementsCatCReducer,
    uncoupleRecouple: uncoupleRecoupleCatC1EReducer,
  })(state as Required<CatC1EUniqueTypes.TestData>, action);
}

export const getTestData = createFeatureSelector<CatC1EUniqueTypes.TestData>('testData');
