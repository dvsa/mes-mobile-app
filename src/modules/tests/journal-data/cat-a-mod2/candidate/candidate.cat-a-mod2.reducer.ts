import { Candidate } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.cat-a-mod2.actions';

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

export function candidateCatAMod2Reducer(
  state = initialState,
  action: candidateActions.Types,
): Candidate {
  switch (action.type) {
    case candidateActions.POPULATE_CANDIDATE_DETAILS_CAT_A_MOD2:
      return action.payload;
    default:
      return state;
  }
}

export const getCandidate = createFeatureSelector<Candidate>('candidate');
