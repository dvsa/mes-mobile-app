import { createFeatureSelector } from '@ngrx/store';

import * as journalActions from './journal.actions';
import { JournalModel } from './journal.model';
import * as moment from 'moment';

export const initialState: JournalModel = {
  isLoading: false,
  lastRefreshed: null,
  slots: {},
  selectedDate: moment().format('YYYY-MM-DD'),
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
        slots: action.payload,
      };
    case journalActions.LOAD_JOURNAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case journalActions.UNLOAD_JOURNAL:
      return {
        ...state,
        slots: {},
      };
    case journalActions.UNSET_ERROR:
    const { error, ...stateWithoutError } = state;
      return {
        ...stateWithoutError,
      }
    case journalActions.CLEAR_CHANGED_SLOT:
      const slots = state.slots[state.selectedDate].map( (slot) => {
       if ( slot.slotData.slotDetail.slotId === action.slotId) {
         return {
           ...slot,
           hasSlotChanged: false,
         }
       }
       return slot;
     });
     

     return {
       ...state,
       slots: { 
         ...state.slots,
         [state.selectedDate]: slots
        },
     };
    default: 
      return state;
  }
}

export const getJournalState = createFeatureSelector<JournalModel>('journal');
