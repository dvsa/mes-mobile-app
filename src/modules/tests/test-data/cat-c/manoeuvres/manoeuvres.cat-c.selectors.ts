import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { get } from 'lodash';

export const getReverseLeftSelected = (manoeuvres: CatCUniqueTypes.Manoeuvres) => {
  return get(manoeuvres, 'reverseLeft.selected', false);
};
