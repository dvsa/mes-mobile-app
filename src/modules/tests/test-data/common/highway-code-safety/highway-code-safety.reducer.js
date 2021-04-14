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
import * as highwayCodeSafetyActions from './highway-code-safety.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {};
export function highwayCodeSafetyReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case highwayCodeSafetyActions.TOGGLE_HIGHWAYCODE_SAFETY:
            return __assign(__assign({}, state), { selected: !state.selected });
        case highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT:
            return __assign(__assign({}, state), { drivingFault: true, selected: true });
        case highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_ADD_SERIOUS_FAULT:
            return __assign(__assign({}, state), { seriousFault: true, selected: true });
        case highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_REMOVE_FAULT:
            return {
                selected: state.selected,
            };
        case highwayCodeSafetyActions.ADD_HIGHWAY_CODE_SAFETY_COMMENT:
            return __assign(__assign({}, state), { faultComments: action.comment });
        default:
            return state;
    }
}
export var getHighwayCodeSafety = createFeatureSelector('highwayCodeSafety');
//# sourceMappingURL=highway-code-safety.reducer.js.map