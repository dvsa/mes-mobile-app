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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as manoeuvresActions from '../../common/manoeuvres/manoeuvres.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { ManoeuvreTypes } from '../../test-data.constants';
export var initialState = {
    reverseLeft: {},
};
export function manoeuvresReducer(state, action) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case manoeuvresActions.RECORD_MANOEUVRES_SELECTION:
            return _a = {},
                _a[action.manoeuvre] = __assign(__assign({}, state[action.manoeuvre]), { selected: true }),
                _a;
        case manoeuvresActions.ADD_MANOEUVRE_DRIVING_FAULT:
            return __assign(__assign({}, state), (_b = {}, _b[action.payload.manoeuvre] = __assign(__assign({}, state[action.payload.manoeuvre]), (_c = { selected: true }, _c[action.payload.competency] = CompetencyOutcome.DF, _c)), _b));
        case manoeuvresActions.ADD_MANOEUVRE_SERIOUS_FAULT:
            return __assign(__assign({}, state), (_d = {}, _d[action.payload.manoeuvre] = __assign(__assign({}, state[action.payload.manoeuvre]), (_e = { selected: true }, _e[action.payload.competency] = CompetencyOutcome.S, _e)), _d));
        case manoeuvresActions.ADD_MANOEUVRE_DANGEROUS_FAULT:
            return __assign(__assign({}, state), (_f = {}, _f[action.payload.manoeuvre] = __assign(__assign({}, state[action.payload.manoeuvre]), (_g = { selected: true }, _g[action.payload.competency] = CompetencyOutcome.D, _g)), _f));
        case manoeuvresActions.ADD_MANOEUVRE_COMMENT:
            return __assign(__assign({}, state), (_h = {}, _h[action.fieldName] = __assign(__assign({}, state[action.fieldName]), (_j = {}, _j[action.controlOrObservation.toLocaleLowerCase() + "FaultComments"] = action.comment, _j)), _h));
        case manoeuvresActions.REMOVE_MANOEUVRE_FAULT:
            var _m = state[action.payload.manoeuvre], _o = action.payload.competency, competencyToOmit = _m[_o], stateToPreserve = __rest(_m, [typeof _o === "symbol" ? _o : _o + ""]);
            return __assign(__assign({}, state), (_k = {}, _k[action.payload.manoeuvre] = stateToPreserve, _k));
        case manoeuvresActions.RECORD_MANOEUVRES_DESELECTION:
            return __assign(__assign({}, state), (_l = {}, _l[ManoeuvreTypes.reverseLeft] = __assign(__assign({}, state[ManoeuvreTypes.reverseLeft]), { selected: false }), _l));
        default:
            return state;
    }
}
//# sourceMappingURL=manoeuvres.reducer.js.map