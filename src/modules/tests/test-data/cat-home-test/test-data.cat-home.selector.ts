
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { CatGUniqueTypes } from '@dvsa/mes-test-schema/categories/G';
import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';

import { get } from 'lodash';

export type CatHomeTestData =
  | CatFUniqueTypes.TestData
  | CatGUniqueTypes.TestData
  | CatHUniqueTypes.TestData
  | CatKUniqueTypes.TestData;

export type CatHomeTestManoeuvres =
| CatFUniqueTypes.Manoeuvres
| CatGUniqueTypes.Manoeuvres
| CatHUniqueTypes.Manoeuvres;

export const getManoeuvres = (data: CatHomeTestData): CatHomeTestManoeuvres => get(data, 'manoeuvres');
