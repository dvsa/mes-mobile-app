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
import * as fromCPCTestSummaryActions from './test-summary.cat-cpc.actions';
import * as fromTestSummaryActions from '../common/test-summary.actions';
export var initialState = {
    candidateDescription: null,
    identification: 'Licence',
    D255: false,
    debriefWitnessed: null,
    additionalInformation: null,
    assessmentReport: null,
};
export function testSummaryCPCReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case fromTestSummaryActions.CANDIDATE_DESCRIPTION_CHANGED:
            return __assign(__assign({}, state), { candidateDescription: action.description });
        case fromTestSummaryActions.IDENTIFICATION_USED_CHANGED:
            return __assign(__assign({}, state), { identification: action.identification });
        case fromTestSummaryActions.ADDITIONAL_INFORMATION_CHANGED:
            return __assign(__assign({}, state), { additionalInformation: action.additionalInformation });
        case fromCPCTestSummaryActions.ASSESSMENT_REPORT_CHANGED:
            return __assign(__assign({}, state), { assessmentReport: action.assessmentReport });
        case fromTestSummaryActions.DEBRIEF_WITNESSED:
            return __assign(__assign({}, state), { debriefWitnessed: true });
        case fromTestSummaryActions.DEBRIEF_UNWITNESSED:
            return __assign(__assign({}, state), { debriefWitnessed: false });
        default:
            return state;
    }
}
export var getTestSummary = createFeatureSelector('testSummary');
//# sourceMappingURL=test-summary.cat-cpc.reducer.js.map