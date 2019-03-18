import { createFeatureSelector } from '@ngrx/store';

import * as journalActions from './journal.actions';
import { JournalModel } from './journal.model';
import { has } from 'lodash';
import { ConnectionStatus } from '../../providers/network-state/network-state';

export const initialState: JournalModel = {
  isLoading: false,
  lastRefreshed: null,
  slots: {},
  selectedDate: '',
};

export function journalReducer(state = initialState, action: journalActions.JournalActionTypes): JournalModel {
  switch (action.type) {
    case journalActions.LOAD_JOURNAL:
      return {
        ...state,
        isLoading: true,
        error: { message: '', status: 0, statusText: '' },
      };
    case journalActions.LOAD_JOURNAL_SUCCESS:
      return {
        ...state,
        lastRefreshed: (action.onlineOffline ===
          ConnectionStatus.ONLINE  && !action.unAuthenticatedMode) ? new Date() : action.lastRefreshed,
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
      };
    case journalActions.CLEAR_CHANGED_SLOT:

      // TODO: This should be moved out to an effect
      const slots = state.slots[state.selectedDate].map((slot) => {
        if (has(slot.slotData, 'slotDetail') &&
          has(slot.slotData.slotDetail, 'slotId') &&
          slot.slotData.slotDetail.slotId === action.slotId) {
          return {
            ...slot,
            hasSlotChanged: false,
          };
        }
        return slot;
      });

      return {
        ...state,
        slots: {
          ...state.slots,
          [state.selectedDate]: slots,
        },
      };
    case journalActions.SET_SELECTED_DAY:
      console.log('journal reducer - set selected date', JSON.stringify(action));
      return {
        ...state,
        selectedDate: action.payload,
      };
    default:
      return state;
  }
}

export const getJournalState = createFeatureSelector<JournalModel>('journal');
