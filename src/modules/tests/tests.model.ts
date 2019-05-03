import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { TestStatus } from './test-status/test-status.model';

export interface CurrentTest {
  slotId: string;
}

export interface TestsModel {
  currentTest: CurrentTest;
  startedTests: { [slotId: string]: StandardCarTestCATBSchema };
  testLifecycles: { [slotId: string]: TestStatus };
}
