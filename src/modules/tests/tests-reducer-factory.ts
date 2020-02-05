
import { Action } from '@ngrx/store';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import { TestResultCatAM1Schema } from '@dvsa/mes-test-schema/categories/AM1';
import { TestResultCatAM2Schema } from '@dvsa/mes-test-schema/categories/AM2';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories/index';
import { testsCatBReducer } from './tests.cat-b.reducer';
import { testsCatBEReducer } from './tests.cat-be.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { testsCatCReducer } from './tests.cat-c.reducer';
import { testsCatCEReducer } from './tests.cat-ce.reducer';
import { testsCatC1Reducer } from './tests.cat-c1.reducer';
import { testsCatC1EReducer } from './tests.cat-c1e.reducer';
import { testsCatAMod1Reducer } from './tests.cat-a-mod1.reducer';
import { testsCatAMod2Reducer } from './tests.cat-a-mod2.reducer';
import { testsCatDReducer } from './tests.cat-d.reducer';
import { testsCatDEReducer } from './tests.cat-de.reducer';
import { testsCatD1Reducer } from './tests.cat-d1.reducer';
import { testsCatD1EReducer } from './tests.cat-d1e.reducer';
export function testsReducerFactory(
  category: TestCategory | null, action: Action, state: TestResultSchemasUnion,
): TestResultSchemasUnion {
  switch (category) {
    case TestCategory.B:
      return testsCatBReducer(action, state as Required<CatBUniqueTypes.TestResult>);
    case TestCategory.BE:
      return testsCatBEReducer(action, state as Required<CatBEUniqueTypes.TestResult>);
    case TestCategory.C:
      return testsCatCReducer(action, state as Required<CatCUniqueTypes.TestResult>);
    case TestCategory.CE:
      return testsCatCEReducer(action, state as Required<CatCEUniqueTypes.TestResult>);
    case TestCategory.C1:
      return testsCatC1Reducer(action, state as Required<CatC1UniqueTypes.TestResult>);
    case TestCategory.C1E:
      return testsCatC1EReducer(action, state as Required<CatC1EUniqueTypes.TestResult>);
    case TestCategory.EUAMM1:
    case TestCategory.EUA1M1:
    case TestCategory.EUA2M1:
    case TestCategory.EUAM1:
      return testsCatAMod1Reducer(action, state as Required<TestResultCatAM1Schema>);
    case TestCategory.EUAMM2:
    case TestCategory.EUA1M2:
    case TestCategory.EUA2M2:
    case TestCategory.EUAM2:
      return testsCatAMod2Reducer(action, state as Required<TestResultCatAM2Schema>);
    case TestCategory.D:
      return testsCatDReducer(action, state as Required<CatDUniqueTypes.TestResult>);
    case TestCategory.DE:
      return testsCatDEReducer(action, state as Required<CatDEUniqueTypes.TestResult>);
    case TestCategory.D1:
      return testsCatD1Reducer(action, state as Required<CatD1UniqueTypes.TestResult>);
    case TestCategory.D1E:
      return testsCatD1EReducer(action, state as Required<CatD1EUniqueTypes.TestResult>);
    default:
      // TODO (low priority): throw an exception here instead of using category b reducer
      return testsCatBReducer(action, state as Required<CatBUniqueTypes.TestResult>);
  }
}
