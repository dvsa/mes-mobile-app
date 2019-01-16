import { createFeatureSelector } from '@ngrx/store';

import * as journalActions from './journal.actions';
import { JournalModel } from './journal.model';
import newSlotsDetectingChanges from './utils/newSlotsDetectingChanges';

/*
 * data and slots in JournalModel currently contain very
 * similar information. We should decide at a later point
 * which one we want to keep.
 */
export const initialState: JournalModel = {
  isLoading: false,
  lastRefreshed: null,
  data: {},
  slots: [],
};

export function journalReducer(state = initialState, action: journalActions.Types): JournalModel {
  switch (action.type) {
    case journalActions.LOAD_JOURNAL:
      return {
        ...state,
        isLoading: true,
      };
    case journalActions.LOAD_JOURNAL_SUCCESS:
      return {
        ...state,
        lastRefreshed: new Date(),
        isLoading: false,
        data: action.payload,
        slots: newSlotsDetectingChanges(state.slots, action.payload),
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
