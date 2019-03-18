import { Candidate } from '../../../shared/models/DJournal';
import { createFeatureSelector } from '@ngrx/store';
import * as candidateActions from './candidate.actions';

export const initialState = null;

export function candidateReducer(
  state = initialState,
  action: candidateActions.Types,
): Candidate {
  switch (action.type) {
    case candidateActions.CHANGE_ACTIVE_CANDIDATE:
      return action.payload;
  }
  return state;
}

export const getCurrentCandidate = createFeatureSelector<Candidate>('candidate');
