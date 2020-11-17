import { TestStatus } from './test-status/test-status.model';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories/index';

export interface CurrentTest {
  slotId: string;
}

export interface TestsModel {
  currentTest: CurrentTest;
  startedTests: { [slotId: string]: TestResultSchemasUnion };
  testStatus: { [slotId: string]: TestStatus };
  completedTests: number[];
}
