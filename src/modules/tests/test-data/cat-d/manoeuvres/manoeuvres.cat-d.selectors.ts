import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';

import { get } from 'lodash';

export type CatDManoeuvres =
  | CatDUniqueTypes.Manoeuvres
  | CatD1UniqueTypes.Manoeuvres
  | CatDEUniqueTypes.Manoeuvres
  | CatD1EUniqueTypes.Manoeuvres;

export const getReverseLeftSelected = (manoeuvres: CatDManoeuvres) => {
  return get(manoeuvres, 'reverseLeft.selected', false);
};
