import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.cat-c.actions';

export const initialState: CatCUniqueTypes.Candidate = {
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

export function candidateCatCReducer(
  state = initialState,
  action: candidateActions.Types,
): CatCUniqueTypes.Candidate {
  switch (action.type) {
    case candidateActions.POPULATE_CANDIDATE_DETAILS_CAT_C:
      return action.payload;
    default:
      return state;
  }
}

export const getCandidate = createFeatureSelector<CatCUniqueTypes.Candidate>('candidate');
