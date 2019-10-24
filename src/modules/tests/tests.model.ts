import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { TestStatus } from './test-status/test-status.model';
import { StandardTrailerTestCATBESchema } from '@dvsa/mes-test-schema/categories/BE';

export type TestResultUnionType = CatBUniqueTypes.TestResult | StandardTrailerTestCATBESchema;

export interface CurrentTest {
  slotId: string;
}

export interface TestsModel {
  currentTest: CurrentTest;
  startedTests: { [slotId: string]: TestResultUnionType };
  testStatus: { [slotId: string]: TestStatus };
}
