import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import * as manoeuvresActions from '../../common/manoeuvres/manoeuvres.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { ManoeuvreTypes } from '../../test-data.constants';
import { ManoeuvreUnion } from '../../../../../providers/manoeuvres-by-category/manoeuvres-by-category';

export const initialState: CatADI2UniqueTypes.Manoeuvres[] = [];

export function manoeuvresReducer(
  state = initialState,
  action: manoeuvresActions.Types,
): CatADI2UniqueTypes.Manoeuvres[] {
  switch (action.type) {
    default:
      return state;
  }
}
