import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { eyesightTestReducer } from '../common/eyesight-test/eyesight-test.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { vehicleChecksCatADI2Reducer } from './vehicle-checks/vehicle-checks.cat-adi-part2.reducer';
import { testRequirementsCatADI2Reducer } from './test-requirements/test-requirements.cat-adi-part2.reducer';
import { controlledStopReducer } from '../common/controlled-stop/controlled-stop.reducer';
import { manoeuvresCatADI2Reducer } from './manoeuvres/manoeuvres.reducer';
export var initialState = {
    dangerousFaults: {},
    drivingFaults: {},
    seriousFaults: {},
    testRequirements: {},
    ETA: {},
    eco: {},
    eyesightTest: {},
    vehicleChecks: {
        tellMeQuestions: [],
        showMeQuestions: [],
    },
    controlledStop: {},
    manoeuvres: [{}, {}],
};
export function testDataCatADI2Reducer(state, action) {
    return combineReducers({
        drivingFaults: drivingFaultsReducer,
        dangerousFaults: dangerousFaultsReducer,
        seriousFaults: seriousFaultsReducer,
        vehicleChecks: vehicleChecksCatADI2Reducer,
        eco: ecoReducer,
        ETA: etaReducer,
        eyesightTest: eyesightTestReducer,
        testRequirements: testRequirementsCatADI2Reducer,
        manoeuvres: manoeuvresCatADI2Reducer,
        controlledStop: controlledStopReducer,
    })(state, action);
}
export var getTestData = createFeatureSelector('testData');
//# sourceMappingURL=test-data.cat-adi-part2.reducer.js.map