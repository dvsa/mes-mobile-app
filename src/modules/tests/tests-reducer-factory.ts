
import { TestCategory } from '../../shared/models/test-category';
import { Action } from '@ngrx/store';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { StandardTrailerTestCATBESchema } from '@dvsa/mes-test-schema/categories/BE';
import { testsCatBReducer } from './tests.cat-b.reducer';
import { testsCatBeReducer } from './tests.cat-be.reducer';
import { TestResultUnionType } from './tests.model';

export function testsReducerFactory(
  category: string | null, action: Action, state: TestResultUnionType,
): TestResultUnionType {
  switch (category) {
    case TestCategory.B:
      return testsCatBReducer(action, state as Required<StandardCarTestCATBSchema>);
    case TestCategory.BE:
      return testsCatBeReducer(action, state as Required<StandardTrailerTestCATBESchema>);
    default:
      return testsCatBReducer(action, state as Required<StandardCarTestCATBSchema>);
  }
}
