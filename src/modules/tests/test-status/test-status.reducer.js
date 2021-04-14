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
import { TestStatus } from './test-status.model';
import { createFeatureSelector } from '@ngrx/store';
import * as testStatusActions from './test-status.actions';
export var initialState = {};
export function testStatusReducer(state, action) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case testStatusActions.SET_TEST_STATUS_BOOKED:
            return __assign(__assign({}, state), (_a = {}, _a[action.slotId] = TestStatus.Booked, _a));
        case testStatusActions.SET_TEST_STATUS_STARTED:
            return __assign(__assign({}, state), (_b = {}, _b[action.slotId] = TestStatus.Started, _b));
        case testStatusActions.SET_TEST_STATUS_DECIDED:
            return __assign(__assign({}, state), (_c = {}, _c[action.slotId] = TestStatus.Decided, _c));
        case testStatusActions.SET_TEST_STATUS_WRITE_UP:
            return __assign(__assign({}, state), (_d = {}, _d[action.slotId] = TestStatus.WriteUp, _d));
        case testStatusActions.SET_TEST_STATUS_AUTOSAVED:
            return __assign(__assign({}, state), (_e = {}, _e[action.slotId] = TestStatus.Autosaved, _e));
        case testStatusActions.SET_TEST_STATUS_COMPLETED:
            return __assign(__assign({}, state), (_f = {}, _f[action.slotId] = TestStatus.Completed, _f));
        case testStatusActions.SET_TEST_STATUS_SUBMITTED:
            return __assign(__assign({}, state), (_g = {}, _g[action.slotId] = TestStatus.Submitted, _g));
        default:
            return state;
    }
}
export var getTestStatus = createFeatureSelector('testStatus');
//# sourceMappingURL=test-status.reducer.js.map