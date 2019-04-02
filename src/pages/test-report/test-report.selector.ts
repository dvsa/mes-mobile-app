
import { TestReportModel } from './test-report.model';

export const isSeriousMode = (testReport: TestReportModel) => testReport.seriousMode;

export const isDangerousMode = (testReport: TestReportModel) => testReport.dangerousMode;
