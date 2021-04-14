import * as examinerConductedActions from './examiner-conducted.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = null;
export var examinerConductedReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case examinerConductedActions.SET_EXAMINER_CONDUCTED:
            return action.examinerConducted;
        default:
            return state;
    }
};
export var getExaminerConducted = createFeatureSelector('examinerConducted');
//# sourceMappingURL=examiner-conducted.reducer.js.map