import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.cat-d.actions';
export var initialState = {
    candidateId: null,
    candidateName: {},
    driverNumber: null,
    dateOfBirth: null,
    gender: null,
    candidateAddress: {},
    primaryTelephone: null,
    secondaryTelephone: null,
    mobileTelephone: null,
    emailAddress: null,
    prn: null,
    previousADITests: null,
    ethnicityCode: null,
    businessAddress: {},
    businessName: null,
    businessTelephone: null,
};
export function candidateCatDReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case candidateActions.POPULATE_CANDIDATE_DETAILS_CAT_D:
            return action.payload;
        default:
            return state;
    }
}
export var getCandidate = createFeatureSelector('candidate');
//# sourceMappingURL=candidate.cat-d.reducer.js.map