import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { combinationReducer } from './combination/combination.reducer';
import { totalPercentageReducer } from './overall-score/total-percentage.reducer';
import { question1Reducer, question2Reducer, question3Reducer, question4Reducer, question5Reducer, } from './questions/questions.reducer';
export var initialState = {
    combination: null,
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
    totalPercent: null,
};
export function testDataCatCPCReducer(state, action) {
    if (state === void 0) { state = initialState; }
    return combineReducers({
        combination: combinationReducer,
        question1: question1Reducer,
        question2: question2Reducer,
        question3: question3Reducer,
        question4: question4Reducer,
        question5: question5Reducer,
        totalPercent: totalPercentageReducer,
    })(state, action);
}
export var getTestData = createFeatureSelector('testData');
//# sourceMappingURL=test-data.cat-cpc.reducer.js.map