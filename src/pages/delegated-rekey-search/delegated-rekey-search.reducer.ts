
import * as delegatedRekeySearchActions from './delegated-rekey-search.actions';
import { createFeatureSelector } from '@ngrx/store';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { DelegatedRekeySearchError, DelegatedRekeySearchErrorMessages } from './delegated-rekey-search-error-model';
import { HttpErrorResponse } from '@angular/common/http';

export type DelegatedRekeySearchModel = {
  isLoading: boolean,
  hasSearched: boolean,
  bookedTestSlot: TestSlot,
  err: DelegatedRekeySearchError | HttpErrorResponse,
};

export const initialState: DelegatedRekeySearchModel = {
  isLoading: false,
  hasSearched: false,
  bookedTestSlot: {},
  err: {
    message: '' as DelegatedRekeySearchErrorMessages,
  },
};

export function delegatedSearchReducer(
  state = initialState, action: delegatedRekeySearchActions.DelegatedRekeySearchActionTypes) {
  switch (action.type) {
    case delegatedRekeySearchActions.DELEGATED_REKEY_SEARCH_CLEAR_STATE:
      return initialState;
    case delegatedRekeySearchActions.SEARCH_BOOKED_DELEGATED_TEST:
      return {
        ...state,
        bookedTestSlot: {},
        isLoading: true,
        hasSearched: false,
      };
    case delegatedRekeySearchActions.SEARCH_BOOKED_DELEGATED_TEST_SUCCESS:
      return {
        ...state,
        bookedTestSlot: action.testSlot,
        isLoading: false,
        hasSearched: true,
      };
    case delegatedRekeySearchActions.SEARCH_BOOKED_DELEGATED_TEST_FAILURE:
      return {
        ...state,
        err: action.err,
        isLoading: false,
        hasSearched: true,
      };
    default:
      return state;
  }
}

export const getDelegatedRekeySearchState = createFeatureSelector<DelegatedRekeySearchModel>('delegatedRekeySearch');
