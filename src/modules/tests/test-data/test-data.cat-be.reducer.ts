import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { controlledStopReducer } from './controlled-stop/controlled-stop.reducer';
import { dangerousFaultsReducer } from './dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from './driving-faults/driving-faults.reducer';
import { ecoReducer } from './eco/eco.reducer';
import { etaReducer } from './eta/eta.reducer';
import { eyesightTestReducer } from './eyesight-test/eyesight-test.reducer';
import { manoeuvresReducer } from './manoeuvres/manoeuvres.reducer';
import { seriousFaultsReducer } from './serious-faults/serious-faults.reducer';
import { testRequirementsReducer } from './test-requirements/test-requirements.reducer';
import { vehicleChecksReducer } from './vehicle-checks/vehicle-checks.reducer';

export function testDataCatBeReducer(
  state: TestData,
  action: Action,
): TestData {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksReducer,
    controlledStop: controlledStopReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    eyesightTest: eyesightTestReducer,
    manoeuvres: manoeuvresReducer,
    testRequirements: testRequirementsReducer,
  })(state as Required<TestData>, action);
}

// TODO - do we need this in every test data reducer or can we just have this once?
export const getTestData = createFeatureSelector<TestData>('testData');
