var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as instructorDetailsActions from './instructor-details.actions';
import { createFeatureSelector } from '@ngrx/store';
var initialState = {};
export var instructorDetailsReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case instructorDetailsActions.INSTRUCTOR_REGISTRATION_NUMBER_CHANGED:
            return __assign(__assign({}, state), { registrationNumber: action.instructorRegistrationNumber });
        default:
            return state;
    }
};
export var getInstructorDetails = createFeatureSelector('instructorDetails');
//# sourceMappingURL=instructor-details.reducer.js.map