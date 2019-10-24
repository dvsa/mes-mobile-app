import { Candidate } from '@dvsa/mes-test-schema/categories/Common';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.actions';

export const initialState: Candidate = {
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
};

export function candidateReducer(
  state = initialState,
  action: candidateActions.Types,
): Candidate {
  switch (action.type) {
    case candidateActions.POPULATE_CANDIDATE_DETAILS:
      return action.payload;
  }
  return state;
}

export const getCandidate = createFeatureSelector<Candidate>('candidate');
