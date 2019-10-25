import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.actions';

export const initialState: CatBEUniqueTypes.Candidate = {
  candidateId: null,
  candidateName: {},
  driverNumber: '',
  dateOfBirth: '',
  gender: null,
  candidateAddress: {},
  primaryTelephone: '',
  secondaryTelephone: '',
  mobileTelephone: '',
  emailAddress: '',
  prn: null,
  previousADITests: null,
  ethnicityCode: '',
  businessAddress: {},
  businessName: '',
  businessTelephone: '',
};

export function candidateCatBEReducer(
  state = initialState,
  action: candidateActions.Types,
): CatBEUniqueTypes.Candidate {
  switch (action.type) {
    case candidateActions.POPULATE_CANDIDATE_DETAILS:
      return action.payload;
  }
  return state;
}

export const getCandidate = createFeatureSelector<CatBEUniqueTypes.Candidate>('candidate');
