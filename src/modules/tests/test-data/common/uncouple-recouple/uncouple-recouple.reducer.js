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
import * as uncoupleRecoupleActions from './uncouple-recouple.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
export var initialState = {};
export function uncoupleRecoupleReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case uncoupleRecoupleActions.TOGGLE_UNCOUPLE_RECOUPLE:
            return __assign(__assign({}, state), { selected: !state.selected });
        case uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT:
            return __assign(__assign({}, state), { fault: CompetencyOutcome.DF, selected: true });
        case uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_SERIOUS_FAULT:
            return __assign(__assign({}, state), { fault: CompetencyOutcome.S, selected: true });
        case uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_DANGEROUS_FAULT:
            return __assign(__assign({}, state), { fault: CompetencyOutcome.D, selected: true });
        case uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_REMOVE_FAULT:
            return {
                selected: state.selected,
            };
        case uncoupleRecoupleActions.ADD_UNCOUPLE_RECOUPLE_COMMENT:
            return __assign(__assign({}, state), { faultComments: action.comment });
        default:
            return state;
    }
}
//# sourceMappingURL=uncouple-recouple.reducer.js.map