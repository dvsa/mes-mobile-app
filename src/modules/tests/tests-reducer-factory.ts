import { TestCategory } from '../../shared/models/test-category';
import { Action } from '@ngrx/store';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { StandardTrailerTestCATBESchema } from '@dvsa/mes-test-schema/categories/BE';
import { testsCatBReducer } from './tests.cat-b.reducer';
import { testsCatBeReducer } from './tests.cat-be.reducer';

type unionType = Required<StandardCarTestCATBSchema> | Required<StandardTrailerTestCATBESchema>;

export function testsReducerFactory(category: string | null, action: Action, state: unionType): unionType {
  console.log('testsReducerFactory', category , action, state);
  switch (category) {
    case TestCategory.B:
      return testsCatBReducer(category, action, state as Required<StandardCarTestCATBSchema>);
    case TestCategory.BE:
      return testsCatBeReducer(category, action, state as Required<StandardTrailerTestCATBESchema>);
    default:
      return testsCatBReducer(category, action, state as Required<StandardCarTestCATBSchema>);
  }
}
