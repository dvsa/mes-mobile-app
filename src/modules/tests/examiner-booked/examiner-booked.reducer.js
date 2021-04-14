import * as examinerBookedActions from './examiner-booked.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = null;
export var examinerBookedReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case examinerBookedActions.SET_EXAMINER_BOOKED:
            return action.examinerBooked;
        default:
            return state;
    }
};
export var getExaminerBooked = createFeatureSelector('examinerBooked');
//# sourceMappingURL=examiner-booked.reducer.js.map