
import { testDataReducer } from './test-data.reducer';
import { testDataCatBeReducer } from './test-data.cat-be.reducer';

import { TestCategories } from '../../../shared/constants/test-categories';

export function testDataReducerFactory(category: string | null) {

  switch (category) {
    case TestCategories.B:
      return testDataReducer;
    case TestCategories.BE:
      return testDataCatBeReducer;
    default:
      return testDataReducer;
  }

}
