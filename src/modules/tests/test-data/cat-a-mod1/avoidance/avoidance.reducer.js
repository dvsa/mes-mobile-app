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
import * as avoidanceActions from './avoidance.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
export var initialState = {};
export function avoidanceReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case avoidanceActions.RECORD_AVOIDANCE_FIRST_ATTEMPT:
            return __assign(__assign({}, state), { firstAttempt: action.attemptedSpeed });
        case avoidanceActions.RECORD_AVOIDANCE_SECOND_ATTEMPT:
            return __assign(__assign({}, state), { secondAttempt: action.attemptedSpeed });
        case avoidanceActions.ADD_AVOIDANCE_SERIOUS_FAULT:
            return __assign(__assign({}, state), { outcome: CompetencyOutcome.S });
        case avoidanceActions.REMOVE_AVOIDANCE_SERIOUS_FAULT:
            return __assign(__assign({}, state), { outcome: null });
        case avoidanceActions.ADD_AVOIDANCE_SPEED_REQUIREMENT_COMMENT:
            return __assign(__assign({}, state), { comments: action.comment });
        default:
            return state;
    }
}
//# sourceMappingURL=avoidance.reducer.js.map