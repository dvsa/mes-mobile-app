import * as passCompletionActionsCatC from './pass-completion.cat-c.actions';
import * as passCompletionActions from '../pass-completion.actions';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C/index';
import { createFeatureSelector } from '@ngrx/store';
import { passCompletionReducer } from '../pass-completion.reducer';

export const initialState: CatCUniqueTypes.PassCompletion = null;

export const passCompletionCatCReducer = (
  state = initialState,
  action: passCompletionActionsCatC.Types | passCompletionActions.Types,
) => {
  switch (action.type) {
    case passCompletionActionsCatC.CODE_78_PRESENT:
      return {
        ...state,
        code78Present: true,
      };
    case passCompletionActionsCatC.CODE_78_NOT_PRESENT:
      return {
        ...state,
        code78Present: false,
      };
    default:
      return passCompletionReducer(state, action);
  }
};

export const getPassCompletion = createFeatureSelector<CatCUniqueTypes.PassCompletion>('passCompletion');
