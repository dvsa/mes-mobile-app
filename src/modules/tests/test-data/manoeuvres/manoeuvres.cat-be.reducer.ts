import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { Action } from '@ngrx/store';

export const initialState: CatBEUniqueTypes.Manoeuvres = {
  reverseLeft: {},
};

export function manoeuvresCatBEReducer(
  state: CatBEUniqueTypes.Manoeuvres = initialState, action: Action): CatBEUniqueTypes.Manoeuvres {
  switch (action.type) {
    default:
      return state;
  }
}
