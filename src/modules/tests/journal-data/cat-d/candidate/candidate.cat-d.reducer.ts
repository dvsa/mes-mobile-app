import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.cat-d.actions';

export const initialState: CatDUniqueTypes.Candidate = {
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

export function candidateCatDReducer(
  state = initialState,
  action: candidateActions.Types,
): CatDUniqueTypes.Candidate {
  switch (action.type) {
    case candidateActions.POPULATE_CANDIDATE_DETAILS_CAT_D:
      return action.payload;
    default:
      return state;
  }
}

export const getCandidate = createFeatureSelector<CatDUniqueTypes.Candidate>('candidate');
