import * as passCompletionActions from './pass-completion.cat-c.actions';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C/index';
import { createFeatureSelector } from '@ngrx/store';
import { passCompletionReducer } from '../pass-completion.reducer';

export const initialState: CatCUniqueTypes.PassCompletion = null;

export const passCompletionCatCReducer = (state = initialState, action: passCompletionActions.Types) => {
  switch (action.type) {
    case passCompletionActions.CODE_78_PRESENT:
      return {
        ...state,
        code78Present: true,
      };
    case passCompletionActions.CODE_78_NOT_PRESENT:
      return {
        ...state,
        code78Present: false,
      };
    default:
      return passCompletionReducer(state, action);
  }
};

export const getPassCompletion = createFeatureSelector<CatCUniqueTypes.PassCompletion>('passCompletion');
