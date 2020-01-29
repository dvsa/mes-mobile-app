import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';

export type PassCompletionUnion =
  | CatBUniqueTypes.PassCompletion
  | CatBEUniqueTypes.PassCompletion
  | CatCUniqueTypes.PassCompletion
  | CatC1UniqueTypes.PassCompletion
  | CatCEUniqueTypes.PassCompletion
  | CatC1EUniqueTypes.PassCompletion;
