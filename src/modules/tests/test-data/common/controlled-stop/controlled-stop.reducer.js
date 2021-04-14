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
import * as controlledStopActions from './controlled-stop.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {};
export function controlledStopReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case controlledStopActions.TOGGLE_CONTROLLED_STOP:
            return __assign(__assign({}, state), { selected: !state.selected });
        case controlledStopActions.CONTROLLED_STOP_ADD_DRIVING_FAULT:
            return __assign(__assign({}, state), { fault: CompetencyOutcome.DF, selected: true });
        case controlledStopActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT:
            return __assign(__assign({}, state), { fault: CompetencyOutcome.S, selected: true });
        case controlledStopActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT:
            return __assign(__assign({}, state), { fault: CompetencyOutcome.D, selected: true });
        case controlledStopActions.CONTROLLED_STOP_REMOVE_FAULT:
            return {
                selected: state.selected,
            };
        case controlledStopActions.ADD_CONTROLLED_STOP_COMMENT:
            return __assign(__assign({}, state), { faultComments: action.comment });
        default:
            return state;
    }
}
export var getControlledStop = createFeatureSelector('controlledStop');
//# sourceMappingURL=controlled-stop.reducer.js.map