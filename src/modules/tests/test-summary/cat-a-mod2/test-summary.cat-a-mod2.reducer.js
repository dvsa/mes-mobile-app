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
import * as fromMod2TestSummaryActions from './test-summary.cat-a-mod2.actions';
import * as fromTestSummaryActions from '../common/test-summary.actions';
export var initialState = {
    routeNumber: null,
    modeOfTransport: null,
    independentDriving: null,
    candidateDescription: null,
    additionalInformation: null,
    weatherConditions: [],
    debriefWitnessed: null,
    D255: null,
    identification: 'Licence',
};
export function testSummaryMod2Reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case fromTestSummaryActions.ADDITIONAL_INFORMATION_CHANGED:
            return __assign(__assign({}, state), { additionalInformation: action.additionalInformation });
        case fromTestSummaryActions.CANDIDATE_DESCRIPTION_CHANGED:
            return __assign(__assign({}, state), { candidateDescription: action.description });
        case fromTestSummaryActions.ROUTE_NUMBER_CHANGED:
            return __assign(__assign({}, state), { routeNumber: action.routeNumber });
        case fromTestSummaryActions.DEBRIEF_WITNESSED:
            return __assign(__assign({}, state), { debriefWitnessed: true });
        case fromTestSummaryActions.DEBRIEF_UNWITNESSED:
            return __assign(__assign({}, state), { debriefWitnessed: false });
        case fromTestSummaryActions.IDENTIFICATION_USED_CHANGED:
            return __assign(__assign({}, state), { identification: action.identification });
        case fromTestSummaryActions.INDEPENDENT_DRIVING_TYPE_CHANGED:
            return __assign(__assign({}, state), { independentDriving: action.drivingType });
        case fromTestSummaryActions.D255_YES:
            return __assign(__assign({}, state), { D255: true });
        case fromTestSummaryActions.D255_NO:
            return __assign(__assign({}, state), { D255: false });
        case fromTestSummaryActions.WEATHER_CONDITIONS_CHANGED:
            return __assign(__assign({}, state), { weatherConditions: action.weatherConditions });
        case fromMod2TestSummaryActions.MODE_OF_TRANSPORT_CHANGED:
            return __assign(__assign({}, state), { modeOfTransport: action.modeOfTransport });
        default:
            return state;
    }
}
export var getTestSummary = createFeatureSelector('testSummary');
//# sourceMappingURL=test-summary.cat-a-mod2.reducer.js.map