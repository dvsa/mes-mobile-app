
import { Action } from '@ngrx/store';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories/index';
import { testsCatBReducer } from './tests.cat-b.reducer';
import { testsCatBEReducer } from './tests.cat-be.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
import { testsCatCReducer } from './tests.cat-c.reducer';

export function testsReducerFactory(
  category: TestCategory | null, action: Action, state: TestResultSchemasUnion,
): TestResultSchemasUnion {
  switch (category) {
    case TestCategory.B:
      return testsCatBReducer(action, state as Required<CatBUniqueTypes.TestResult>);
    case TestCategory.BE:
      return testsCatBEReducer(action, state as Required<CatBEUniqueTypes.TestResult>);
    case TestCategory.C:
      return testsCatCReducer(action, state as Required<CatBEUniqueTypes.TestResult>);
    default:
      return testsCatBReducer(action, state as Required<CatBUniqueTypes.TestResult>);
  }
}
