import { Candidate } from '../../../shared/models/DJournal';
import { createFeatureSelector } from '@ngrx/store';
import * as testOutcomeActions from '../../../pages/journal/components/test-outcome/test-outcome.actions';

export const initialState = null;

export function candidateReducer(
  state = initialState,
  action: testOutcomeActions.Types,
): Candidate {
  switch (action.type) {
    case testOutcomeActions.TEST_OUTCOME_START_TEST:
      return action.payload.booking.candidate;
  }
  return state;
}

export const getCurrentCandidate = createFeatureSelector<Candidate>('candidate');
