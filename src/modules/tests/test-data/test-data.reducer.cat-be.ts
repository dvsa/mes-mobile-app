import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { vehicleChecksCatBEReducer } from './vehicle-checks/cat-be/vehicle-checks.cat-be.reducer';
import { controlledStopReducer } from './controlled-stop/controlled-stop.reducer';
import { dangerousFaultsReducer } from './dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from './driving-faults/driving-faults.reducer';
import { ecoReducer } from './eco/eco.reducer';
import { etaReducer } from './eta/eta.reducer';
import { eyesightTestReducer } from './eyesight-test/eyesight-test.reducer';
import { manoeuvresReducer } from './manoeuvres/manoeuvres.reducer';
import { seriousFaultsReducer } from './serious-faults/serious-faults.reducer';
import { testRequirementsReducer } from './test-requirements/test-requirements.reducer';

export function testDataReducerCatBE(
  state: TestData,
  action: Action,
): TestData {
  console.log('this is the CatBE reducer');

  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksCatBEReducer,
    controlledStop: controlledStopReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    eyesightTest: eyesightTestReducer,
    manoeuvres: manoeuvresReducer,
    testRequirements: testRequirementsReducer,
  })(state as Required<TestData>, action);
}

export const getTestData = createFeatureSelector<TestData>('testData');
