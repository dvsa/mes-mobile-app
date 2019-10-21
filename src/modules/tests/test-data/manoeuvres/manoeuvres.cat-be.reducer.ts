import { Manoeuvres } from '@dvsa/mes-test-schema/categories/BE';
import { Action } from '@ngrx/store';

export const initialState: Manoeuvres = {
  reverseLeft: {},
};

export function manoeuvresCatBeReducer(
  state: Manoeuvres = initialState, action: Action): Manoeuvres {
  switch (action.type) {
    default:
      return state;
  }
}
