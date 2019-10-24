
import { TestCategory } from '../../shared/models/test-category';
import { Action } from '@ngrx/store';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { StandardTrailerTestCATBESchema } from '@dvsa/mes-test-schema/categories/BE';
import { testsCatBReducer } from './tests.cat-b.reducer';
import { testsCatBEReducer } from './tests.cat-be.reducer';
import { TestResultUnionType } from './tests.model';

export function testsReducerFactory(
  category: string | null, action: Action, state: TestResultUnionType,
): TestResultUnionType {
  switch (category) {
    case TestCategory.B:
      return testsCatBReducer(action, state as Required<CatBUniqueTypes.TestResult>);
    case TestCategory.BE:
      return testsCatBEReducer(action, state as Required<StandardTrailerTestCATBESchema>);
    default:
      return testsCatBReducer(action, state as Required<CatBUniqueTypes.TestResult>);
  }
}
