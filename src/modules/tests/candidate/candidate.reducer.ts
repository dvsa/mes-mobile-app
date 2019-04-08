import { Candidate } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.actions';

export const initialState = null;

export function candidateReducer(
  state = initialState,
  action: candidateActions.Types,
): Candidate {
  switch (action.type) {

    // TODO: Deal with a more specific action here so that we don't need to introduce logic to the reducer
    case candidateActions.POPULATE_CANDIDATE_DETAILS:
      console.log('Candidate', action);
      return action.payload;
  }
  return state;
}

export const getCandidate = createFeatureSelector<Candidate>('candidate');
