import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.cat-be.actions';
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
export function candidateCatBEReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case candidateActions.POPULATE_CANDIDATE_DETAILS_CAT_BE:
            return action.payload;
        default:
            return state;
    }
}
export var getCandidate = createFeatureSelector('candidate');
//# sourceMappingURL=candidate.cat-be.reducer.js.map