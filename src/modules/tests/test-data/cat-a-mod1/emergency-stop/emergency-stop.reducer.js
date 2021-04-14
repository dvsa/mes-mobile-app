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
import * as emergencyStopActions from './emergency-stop.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
export var initialState = {};
export function emergencyStopReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case emergencyStopActions.RECORD_EMERGENCY_STOP_FIRST_ATTEMPT:
            return __assign(__assign({}, state), { firstAttempt: action.attemptedSpeed });
        case emergencyStopActions.RECORD_EMERGENCY_STOP_SECOND_ATTEMPT:
            return __assign(__assign({}, state), { secondAttempt: action.attemptedSpeed });
        case emergencyStopActions.ADD_EMERGENCY_STOP_SERIOUS_FAULT:
            return __assign(__assign({}, state), { outcome: CompetencyOutcome.S });
        case emergencyStopActions.REMOVE_EMERGENCY_STOP_SERIOUS_FAULT:
            return __assign(__assign({}, state), { outcome: null });
        case emergencyStopActions.ADD_EMERGENCY_STOP_COMMENT:
            return __assign(__assign({}, state), { comments: action.comment });
        default:
            return state;
    }
}
//# sourceMappingURL=emergency-stop.reducer.js.map