
import { testDataReducer } from './test-data.reducer';
import { testDataReducerCatBE } from './test-data.reducer.cat-be';

import { TestCategories } from '../../../shared/constants/test-categories';

export function testDataReducerFactory(category: string | null) {

  switch (category) {
    case TestCategories.B:
      return testDataReducer;
    case TestCategories.BE:
      return testDataReducerCatBE;
    default:
      return testDataReducer;
  }

}
