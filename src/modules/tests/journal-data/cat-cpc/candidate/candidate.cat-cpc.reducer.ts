import { createFeatureSelector } from '@ngrx/store';
import { Candidate } from '@dvsa/mes-test-schema/categories/CPC';

import * as candidateActions from './candidate.cat-cpc.actions';

export const initialState: Candidate = {
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
};

export function candidateCatCPCReducer(
  state = initialState,
  action: candidateActions.Types,
): Candidate {
  switch (action.type) {
    case candidateActions.POPULATE_CANDIDATE_DETAILS_CAT_CPC:
      return action.payload;
    default:
      return state;
  }
}

export const getCandidate = createFeatureSelector<Candidate>('candidate');
