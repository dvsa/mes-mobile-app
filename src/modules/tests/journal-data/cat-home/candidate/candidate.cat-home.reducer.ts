import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.cat-home.actions';

export const initialState: CatFUniqueTypes.Candidate = {
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

export function candidateCatHomeReducer(
  state = initialState,
  action: candidateActions.Types,
): CatFUniqueTypes.Candidate {
  switch (action.type) {
    case candidateActions.POPULATE_CANDIDATE_DETAILS_CAT_HOME:
      return action.payload;
    default:
      return state;
  }
}

export const getCandidate = createFeatureSelector<CatFUniqueTypes.Candidate>('candidate');
