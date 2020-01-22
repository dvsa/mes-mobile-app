import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.cat-be.actions';

export const initialState: CatBEUniqueTypes.Candidate = {
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

export function candidateCatBEReducer(
  state = initialState,
  action: candidateActions.Types,
): CatBEUniqueTypes.Candidate {
  switch (action.type) {
    case candidateActions.POPULATE_CANDIDATE_DETAILS_CAT_BE:
      return action.payload;
    default:
      return state;
  }
}

export const getCandidate = createFeatureSelector<CatBEUniqueTypes.Candidate>('candidate');
