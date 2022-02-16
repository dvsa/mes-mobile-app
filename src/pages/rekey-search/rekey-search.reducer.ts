
import * as rekeySearchActions from './rekey-search.actions';
import { createFeatureSelector } from '@ngrx/store';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { RekeySearchError, RekeySearchErrorMessages } from './rekey-search-error-model';
import { HttpErrorResponse } from '@angular/common/http';
import { SLOT_ACCESSED } from '../../modules/journal/journal.actions';

export type RekeySearchModel = {
  isLoading: boolean,
  hasSearched: boolean,
  staffNumber: string,
  bookedTestSlot: TestSlot,
  accessedSlot: boolean;
  err: RekeySearchError | HttpErrorResponse,
};

export const initialState: RekeySearchModel = {
  isLoading: false,
  hasSearched: false,
  staffNumber: '',
  bookedTestSlot: {},
  accessedSlot: false,
  err: {
    message: '' as RekeySearchErrorMessages,
  },
};

export function rekeySearchReducer(state = initialState, action: rekeySearchActions.RekeySearchActionTypes) {
  switch (action.type) {
    case rekeySearchActions.REKEY_SEARCH_CLEAR_STATE:
      return initialState;
    case rekeySearchActions.SEARCH_BOOKED_TEST:
      return {
        ...state,
        bookedTestSlot: {},
        isLoading: true,
        hasSearched: false,
      };
    case rekeySearchActions.SEARCH_BOOKED_TEST_SUCCESS:
      return {
        ...state,
        bookedTestSlot: action.testSlot,
        staffNumber: action.staffNumber,
        isLoading: false,
        hasSearched: true,
      };
    case rekeySearchActions.SEARCH_BOOKED_TEST_FAILURE:
      return {
        ...state,
        err: action.err,
        isLoading: false,
        hasSearched: true,
      };
    case SLOT_ACCESSED:
      return {
        ...state,
        accessedSlot: true,
      };
    default:
      return state;
  }
}

export const getRekeySearchState = createFeatureSelector<RekeySearchModel>('rekeySearch');
