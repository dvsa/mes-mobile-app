import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { TestStatus } from './test-status/test-status.model';
import { StandardTrailerTestCATBESchema } from '@dvsa/mes-test-schema/categories/BE';

export interface CurrentTest {
  slotId: string;
}

export interface TestsModel {
  currentTest: CurrentTest;
  startedTests: { [slotId: string]: StandardCarTestCATBSchema | StandardTrailerTestCATBESchema };
  testStatus: { [slotId: string]: TestStatus };
}
