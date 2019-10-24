
import { PassCompletion } from '@dvsa/mes-test-schema/categories/BE';
import { Action } from '@ngrx/store';

export const initialState: PassCompletion = null;

export function passCompletionCatBEReducer(state: PassCompletion = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
