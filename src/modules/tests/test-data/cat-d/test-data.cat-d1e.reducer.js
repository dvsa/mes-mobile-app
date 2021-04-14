import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { testRequirementsCatDReducer } from './test-requirements/test-requirements.cat-d.reducer';
import { vehicleChecksCatDReducer } from './vehicle-checks/vehicle-checks.cat-d.reducer';
import { safetyQuestionsCatDReducer } from './safety-questions/safety-questions.cat-d.reducer';
import { manoeuvresReducer } from '../common/manoeuvres/manoeuvres.reducer';
import { pcvDoorExerciseReducer } from './pcv-door-exercise/pcv-door-exercise.reducer';
import { uncoupleRecoupleReducer } from '../common/uncouple-recouple/uncouple-recouple.reducer';
export var initialState = {
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
    safetyQuestions: {
        questions: [],
    },
    uncoupleRecouple: {},
};
export function testDataCatD1EReducer(state, action) {
    return combineReducers({
        drivingFaults: drivingFaultsReducer,
        dangerousFaults: dangerousFaultsReducer,
        seriousFaults: seriousFaultsReducer,
        vehicleChecks: vehicleChecksCatDReducer,
        safetyQuestions: safetyQuestionsCatDReducer,
        eco: ecoReducer,
        ETA: etaReducer,
        manoeuvres: manoeuvresReducer,
        testRequirements: testRequirementsCatDReducer,
        uncoupleRecouple: uncoupleRecoupleReducer,
        pcvDoorExercise: pcvDoorExerciseReducer,
    })(state, action);
}
export var getTestData = createFeatureSelector('testData');
//# sourceMappingURL=test-data.cat-d1e.reducer.js.map