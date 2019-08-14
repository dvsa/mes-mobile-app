
import { TestReportModel } from './test-report.model';

export const isRemoveFaultMode = (testReport: TestReportModel) => testReport.removeFaultMode;

export const isSeriousMode = (testReport: TestReportModel) => testReport.seriousMode;

export const isDangerousMode = (testReport: TestReportModel) => testReport.dangerousMode;

export const noFaultToRemoveWarning = (testReport: TestReportModel) => testReport.noFaultToRemoveWarning;

export const isLegalRequirementsValid = (testReport: TestReportModel) => testReport.isLegalRequirementsValid;

export const isEtaValid = (testReport: TestReportModel) => testReport.isEtaValid;
