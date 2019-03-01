import { createFeatureSelector } from '@ngrx/store';

import * as journalActions from './journal.actions';
import { JournalModel } from './journal.model';
import { has } from 'lodash';
import { DateTime } from '../../shared/helpers/date-time';

export const initialState: JournalModel = {
  isLoading: false,
  lastRefreshed: null,
  slots: {},
  selectedDate: DateTime.now().format('YYYY-MM-DD'),
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
      const date = DateTime.now().daysDiff(state.selectedDate) < 0
      ? DateTime.now().format('YYYY-MM-DD')
      : state.selectedDate;

      return {
        ...state,
        lastRefreshed: new Date(),
        selectedDate: date,
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
      return {
        ...state,
        selectedDate: action.payload,
      };
    default:
      return state;
  }
}

export const getJournalState = createFeatureSelector<JournalModel>('journal');
