import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';

import { get } from 'lodash';

export type CatCManoeuvres =
  | CatCUniqueTypes.Manoeuvres
  | CatC1UniqueTypes.Manoeuvres
  | CatCEUniqueTypes.Manoeuvres
  | CatC1EUniqueTypes.Manoeuvres;

export const getReverseLeftSelected = (manoeuvres: CatCManoeuvres) => {
  return get(manoeuvres, 'reverseLeft.selected', false);
};
