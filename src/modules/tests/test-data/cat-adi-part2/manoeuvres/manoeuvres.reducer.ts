import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import * as manoeuvresActions from './manoeuvres.actions';

export const initialState: CatADI2UniqueTypes.Manoeuvres[] = [];

// TODO - ADI2: impliment manoeuvres reducer
export function manoeuvresReducer(
  state = initialState,
  action: manoeuvresActions.Types,
): CatADI2UniqueTypes.Manoeuvres[] {
  switch (action.type) {
    default:
      return state;
  }
}
