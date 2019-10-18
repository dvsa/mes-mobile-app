import { Manoeuvres } from '@dvsa/mes-test-schema/categories/BE';

export const initialState: Manoeuvres = {
  reverseLeft: {},
};

export function manoeuvresCatBEReducer(state: Manoeuvres = initialState, action) {
  return state;
}
