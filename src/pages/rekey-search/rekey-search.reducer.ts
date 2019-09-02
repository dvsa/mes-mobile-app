
import * as rekeySearchActions from './rekey-search.actions';
import { createFeatureSelector } from '@ngrx/store';
import { TestSlot } from '@dvsa/mes-journal-schema';

export type RekeySearchModel = {
  isLoading: boolean,
  hasSearched: boolean,
  staffNumber: string,
  bookedTestSlot: TestSlot,
  err: {
    message: string,
  },
};

export const initialState: RekeySearchModel = {
  isLoading: false,
  hasSearched: false,
  staffNumber: '',
  bookedTestSlot: {},
  err: {
    message: '',
  },
};

export function rekeySearchReducer(state = initialState, action: rekeySearchActions.Types) {
  switch (action.type) {
    case rekeySearchActions.SEARCH_BOOKED_TEST:
      return {
        ...state,
        isLoading: true,
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
    default:
      return state;
  }
}

export const getRekeySearchState = createFeatureSelector<RekeySearchModel>('rekeySearch');
