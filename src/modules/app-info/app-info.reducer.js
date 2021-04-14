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
import * as appInfoActions from './app-info.actions';
export var initialState = {
    versionNumber: 'VERSION_NOT_LOADED',
    employeeId: null,
    employeeName: 'Unknown Name',
};
export function appInfoReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case appInfoActions.LOAD_APP_INFO_SUCCESS:
            return __assign(__assign({}, state), { versionNumber: action.versionNumber });
        case appInfoActions.LOAD_APP_INFO_FAILURE:
            return __assign(__assign({}, state), { error: action.error });
        case appInfoActions.LOAD_EMPLOYEE_ID:
            return __assign(__assign({}, state), { employeeId: action.employeeId });
        case appInfoActions.SET_DATE_CONFIG_LOADED:
            return __assign(__assign({}, state), { dateConfigLoaded: action.refreshDate });
        case appInfoActions.LOAD_EMPLOYEE_NAME_SUCCESS:
            return __assign(__assign({}, state), { employeeName: action.employeeName });
        default:
            return state;
    }
}
export var getAppInfoState = createFeatureSelector('appInfo');
//# sourceMappingURL=app-info.reducer.js.map