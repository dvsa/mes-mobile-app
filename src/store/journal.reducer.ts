import * as journalActions from '../store/journal.actions';

const initialState = {
  isLoading: true,
  testSlot: [],
  error: {},
};

export function journalReducer(state = initialState, action: journalActions.Types) {
  switch (action.type) {
    case journalActions.LOAD_JOURNAL:
      return {
        ...state,
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
