import { Candidate } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';
import * as testOutcomeActions from '../../../pages/journal/components/test-outcome/test-outcome.actions';
import { has } from 'lodash';

export const initialState = null;

export function candidateReducer(
  state = initialState,
  action: testOutcomeActions.Types,
): Candidate {
  switch (action.type) {

    // TODO: Deal with a more specific action here so that we don't need to introduce logic to the reducer
    case testOutcomeActions.TEST_OUTCOME_START_TEST:
      if (!has(action, 'payload.booking.candidate')) {
        return null;
      }
      return action.payload.booking.candidate;
  }
  return state;
}

export const getCandidate = createFeatureSelector<Candidate>('candidate');
