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
import * as testSummaryActions from './test-summary.actions';
export var initialState = {
    routeNumber: null,
    independentDriving: null,
    candidateDescription: null,
    additionalInformation: null,
    weatherConditions: [],
    debriefWitnessed: null,
    D255: null,
    identification: 'Licence',
};
export function testSummaryReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case testSummaryActions.ADDITIONAL_INFORMATION_CHANGED:
            return __assign(__assign({}, state), { additionalInformation: action.additionalInformation });
        case testSummaryActions.CANDIDATE_DESCRIPTION_CHANGED:
            return __assign(__assign({}, state), { candidateDescription: action.description });
        case testSummaryActions.ROUTE_NUMBER_CHANGED:
            return __assign(__assign({}, state), { routeNumber: action.routeNumber });
        case testSummaryActions.DEBRIEF_WITNESSED:
            return __assign(__assign({}, state), { debriefWitnessed: true });
        case testSummaryActions.DEBRIEF_UNWITNESSED:
            return __assign(__assign({}, state), { debriefWitnessed: false });
        case testSummaryActions.IDENTIFICATION_USED_CHANGED:
            return __assign(__assign({}, state), { identification: action.identification });
        case testSummaryActions.INDEPENDENT_DRIVING_TYPE_CHANGED:
            return __assign(__assign({}, state), { independentDriving: action.drivingType });
        case testSummaryActions.D255_YES:
            return __assign(__assign({}, state), { D255: true });
        case testSummaryActions.D255_NO:
            return __assign(__assign({}, state), { D255: false });
        case testSummaryActions.WEATHER_CONDITIONS_CHANGED:
            return __assign(__assign({}, state), { weatherConditions: action.weatherConditions });
        default:
            return state;
    }
}
export var getTestSummary = createFeatureSelector('testSummary');
//# sourceMappingURL=test-summary.reducer.js.map