import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import * as manoeuvresCatADI2Actions from './manoeuvres.actions';

export const initialState: CatADI2UniqueTypes.Manoeuvres[] = [];

// TODO - ADI2: impliment manoeuvres reducer
export function manoeuvresCatADI2Reducer(
  state = initialState,
  action: manoeuvresCatADI2Actions.Types,
): CatADI2UniqueTypes.Manoeuvres[] {
  switch (action.type) {
    default:
      return state;
  }
}
