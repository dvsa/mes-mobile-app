import { get } from 'lodash';
import { ManoeuvreUnion } from '../../../../../providers/manoeuvres-by-category/manoeuvres-by-category';

export const getReverseLeftSelected = (manoeuvres: ManoeuvreUnion) => {
  return get(manoeuvres, 'reverseLeft.selected', false);
};
