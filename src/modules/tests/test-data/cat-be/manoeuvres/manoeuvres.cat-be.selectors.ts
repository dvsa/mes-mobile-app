import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { get } from 'lodash';

export const getReverseLeftSelected = (manoeuvres: CatBEUniqueTypes.Manoeuvres) => {
  return get(manoeuvres, 'reverseLeft.selected', false);
};
