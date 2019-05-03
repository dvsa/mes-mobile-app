import { TestResult } from '../../providers/test-result/test-result.model';

export type TestReportModel = {
  seriousMode: boolean,
  dangerousMode: boolean,
  removeFaultMode: boolean,
  isValid: boolean,
  testResult: TestResult,
};
