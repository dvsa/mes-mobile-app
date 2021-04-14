import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { eyesightTestReducer } from '../common/eyesight-test/eyesight-test.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { vehicleChecksCatBEReducer } from './vehicle-checks/vehicle-checks.cat-be.reducer';
import { testRequirementsCatBEReducer } from './test-requirements/test-requirements.cat-be.reducer';
import { manoeuvresReducer } from '../common/manoeuvres/manoeuvres.reducer';
import { uncoupleRecoupleReducer } from '../common/uncouple-recouple/uncouple-recouple.reducer';
export var initialState = {
    dangerousFaults: {},
    drivingFaults: {},
    manoeuvres: {},
    seriousFaults: {},
    testRequirements: {},
    ETA: {},
    eco: {},
    eyesightTest: {},
    vehicleChecks: {
        tellMeQuestions: [],
        showMeQuestions: [],
    },
};
export function testDataCatBEReducer(state, action) {
    return combineReducers({
        drivingFaults: drivingFaultsReducer,
        dangerousFaults: dangerousFaultsReducer,
        seriousFaults: seriousFaultsReducer,
        vehicleChecks: vehicleChecksCatBEReducer,
        uncoupleRecouple: uncoupleRecoupleReducer,
        eco: ecoReducer,
        ETA: etaReducer,
        eyesightTest: eyesightTestReducer,
        manoeuvres: manoeuvresReducer,
        testRequirements: testRequirementsCatBEReducer,
    })(state, action);
}
export var getTestData = createFeatureSelector('testData');
//# sourceMappingURL=test-data.cat-be.reducer.js.map