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
import { createFeatureSelector } from '@ngrx/store';
import * as accompanimentActions from './accompaniment.cat-cpc.actions';
var initialState = {};
export var accompanimentCatCPCReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case accompanimentActions.SUPERVISOR_ACCOMPANIMENT_TOGGLED:
            return __assign(__assign({}, state), { supervisor: !state.supervisor });
        case accompanimentActions.INTERPRETER_ACCOMPANIMENT_TOGGLED:
            return __assign(__assign({}, state), { interpreter: !state.interpreter });
    }
    return state;
};
export var getAccompaniment = createFeatureSelector('accompaniment');
//# sourceMappingURL=accompaniment.cat-cpc.reducer.js.map