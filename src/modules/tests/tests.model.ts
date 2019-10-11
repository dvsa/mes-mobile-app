import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { TestStatus } from './test-status/test-status.model';
import { StandardTrailerTestCATBESchema } from '@dvsa/mes-test-schema/categories/BE';

type unionType = Required<StandardCarTestCATBSchema> | Required<StandardTrailerTestCATBESchema>;

export interface CurrentTest {
  slotId: string;
}

export interface TestsModel {
  currentTest: CurrentTest;
  startedTests: { [slotId: string]: unionType };
  testStatus: { [slotId: string]: TestStatus };
}
