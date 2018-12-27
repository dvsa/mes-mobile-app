import { createFeatureSelector } from '@ngrx/store';

import * as journalActions from './journal.actions';
import { JournalModel } from './journal.model';

export const initialState: JournalModel = {
    isLoading: false,
    testSlot: [],
};

export function journalReducer(state = initialState, action: journalActions.Types) {
  switch (action.type) {
    case journalActions.LOAD_JOURNAL:
      return {
        ...state,
        isLoading: true,
      };
    case journalActions.LOAD_JOURNAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        testSlot: action.payload,
      };
    case journalActions.LOAD_JOURNAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default: 
      return state;
  }
}

export const getJournalState = createFeatureSelector<JournalModel>('journal');
