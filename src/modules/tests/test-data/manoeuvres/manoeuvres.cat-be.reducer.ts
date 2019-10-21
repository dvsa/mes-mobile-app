import { Manoeuvres } from '@dvsa/mes-test-schema/categories/BE';
import { Action } from '@ngrx/store';

export const initialState: Manoeuvres = {
  reverseLeft: {},
};

export function manoeuvresCatBEReducer(state: Manoeuvres = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
