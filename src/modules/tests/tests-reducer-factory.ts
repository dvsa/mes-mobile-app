
import { TestCategory } from '../../shared/models/test-category';
import { Action } from '@ngrx/store';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { StandardTrailerTestCATBESchema } from '@dvsa/mes-test-schema/categories/BE';
import { testsCatBReducer } from './tests.cat-b.reducer';
import { testsCatBEReducer } from './tests.cat-be.reducer';

export function testsReducerFactory(
  category: string | null, action: Action, state: StandardCarTestCATBSchema,
): StandardCarTestCATBSchema | StandardTrailerTestCATBESchema {
  switch (category) {
    case TestCategory.B:
      return testsCatBReducer(action, state as Required<StandardCarTestCATBSchema>);
    case TestCategory.BE:
      return testsCatBEReducer(action, state as Required<StandardTrailerTestCATBESchema>);
    default:
      return testsCatBReducer(action, state as Required<StandardCarTestCATBSchema>);
  }
}
