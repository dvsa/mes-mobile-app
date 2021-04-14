import * as examinerKeyedActions from './examiner-keyed.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = null;
export var examinerKeyedReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case examinerKeyedActions.SET_EXAMINER_KEYED:
            return action.examinerKeyed;
        default:
            return state;
    }
};
export var getExaminerKeyed = createFeatureSelector('examinerKeyed');
//# sourceMappingURL=examiner-keyed.reducer.js.map