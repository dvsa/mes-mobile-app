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
import * as testReportActions from './test-report.actions';
export var initialState = {
    seriousMode: false,
    dangerousMode: false,
    removeFaultMode: false,
};
export function testReportReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case testReportActions.TOGGLE_REMOVE_FAULT_MODE:
            return __assign(__assign({}, state), { removeFaultMode: !state.removeFaultMode });
        case testReportActions.TOGGLE_SERIOUS_FAULT_MODE:
            return __assign(__assign({}, state), { seriousMode: !state.seriousMode });
        case testReportActions.TOGGLE_DANGEROUS_FAULT_MODE:
            return __assign(__assign({}, state), { dangerousMode: !state.dangerousMode });
        default:
            return state;
    }
}
export var getTestReportState = createFeatureSelector('testReport');
//# sourceMappingURL=test-report.reducer.js.map