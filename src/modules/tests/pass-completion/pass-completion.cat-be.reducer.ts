
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { Action } from '@ngrx/store';

export const initialState: CatBEUniqueTypes.PassCompletion = null;

export function passCompletionCatBEReducer(state: CatBEUniqueTypes.PassCompletion = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
