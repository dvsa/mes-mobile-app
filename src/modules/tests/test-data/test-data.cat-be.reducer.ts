import { TestData } from '@dvsa/mes-test-schema/categories/BE';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from './dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from './driving-faults/driving-faults.reducer';
import { ecoReducer } from './eco/eco.reducer';
import { etaReducer } from './eta/eta.reducer';
import { eyesightTestReducer } from './eyesight-test/eyesight-test.reducer';
import { manoeuvresCatBeReducer } from './manoeuvres/manoeuvres.cat-be.reducer';
import { seriousFaultsReducer } from './serious-faults/serious-faults.reducer';
import { testRequirementsReducer } from './test-requirements/test-requirements.reducer';
import { vehicleChecksCatBeReducer } from './vehicle-checks/vehicle-checks.cat-be.reducer';

export function testDataCatBeReducer(
  state: TestData,
  action: Action,
): TestData {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatBeReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    eyesightTest: eyesightTestReducer,
    manoeuvres: manoeuvresCatBeReducer,
    testRequirements: testRequirementsReducer,
  })(state as Required<TestData>, action);
}

export const getTestData = createFeatureSelector<TestData>('testData');
