
import { TestCategory } from '../../shared/models/test-category';
import { Action } from '@ngrx/store';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { testsCatBReducer } from './tests.cat-b.reducer';

export function testsReducerFactory(
  category: string | null, action: Action, state: StandardCarTestCATBSchema,
): StandardCarTestCATBSchema {
  switch (category) {
    case TestCategory.B:
      return testsCatBReducer(action, state as Required<StandardCarTestCATBSchema>);
    default:
      return testsCatBReducer(action, state as Required<StandardCarTestCATBSchema>);
  }
}
