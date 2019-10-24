import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from './dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from './driving-faults/driving-faults.reducer';
import { ecoReducer } from './eco/eco.reducer';
import { etaReducer } from './eta/eta.reducer';
import { eyesightTestReducer } from './eyesight-test/eyesight-test.reducer';
import { manoeuvresCatBEReducer } from './manoeuvres/manoeuvres.cat-be.reducer';
import { seriousFaultsReducer } from './serious-faults/serious-faults.reducer';
import { testRequirementsReducer } from './test-requirements/test-requirements.reducer';
import { vehicleChecksCatBEReducer } from './vehicle-checks/vehicle-checks.cat-be.reducer';

export function testDataCatBEReducer(
  state: CatBEUniqueTypes.TestData,
  action: Action,
): CatBEUniqueTypes.TestData {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatBEReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    eyesightTest: eyesightTestReducer,
    manoeuvres: manoeuvresCatBEReducer,
    testRequirements: testRequirementsReducer,
  })(state as Required<CatBEUniqueTypes.TestData>, action);
}

export const getTestData = createFeatureSelector<CatBEUniqueTypes.TestData>('testData');
