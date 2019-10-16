import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import { drivingFaultsReducer } from './driving-faults/driving-faults.reducer';
import { dangerousFaultsReducer } from './dangerous-faults/dangerous-faults.reducer';
import { seriousFaultsReducer } from './serious-faults/serious-faults.reducer';
import { vehicleChecksReducer } from './vehicle-checks/vehicle-checks.reducer';
import { controlledStopReducer } from './controlled-stop/controlled-stop.reducer';
import { ecoReducer } from './eco/eco.reducer';
import { etaReducer } from './eta/eta.reducer';
import { eyesightTestReducer } from './eyesight-test/eyesight-test.reducer';
import { manoeuvresReducer } from './manoeuvres/manoeuvres.reducer';
import { testRequirementsReducer } from './test-requirements/test-requirements.reducer';

export const initialState: TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  manoeuvres: {},
  seriousFaults: {},
  testRequirements: {},
  ETA: {},
  eco: {},
  controlledStop: {},
  eyesightTest: {},
  vehicleChecks: {
    tellMeQuestion: {},
    showMeQuestion: {},
  },
};

export function testDataReducer(
  state = initialState,
  action: Action,
): Required<TestData> {
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
    // TODO - what do i do with my fault summary
    faultSummary: () => null,
  })(state as Required<TestData>, action);
}

export const getTestData = createFeatureSelector<TestData>('testData');
