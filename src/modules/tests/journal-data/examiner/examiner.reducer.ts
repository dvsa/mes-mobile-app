import { Examiner } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector } from '@ngrx/store';
import * as examinerActions from './examiner.actions';

export const initialState:Examiner = {
  staffNumber: null,
};

export function examinerReducer(
  state = initialState,
  action: examinerActions.Types,
): Examiner {
  switch (action.type) {
    case examinerActions.POPULATE_EXAMINER:
      return action.payload;
  }
  return state;
}

export const getExaminer = createFeatureSelector<Examiner>('examiner');
