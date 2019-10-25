
import { testDataReducer } from './test-data.reducer';
import { testDataCatBEReducer } from './test-data.cat-be.reducer';
import { TestCategory } from '../../../shared/models/test-category';

export function testDataReducerFactory(category: string | null) {

  switch (category) {
    case TestCategory.B:
      return testDataReducer;
    case TestCategory.BE:
      return testDataCatBEReducer;
    default:
      return testDataReducer;
  }

}
