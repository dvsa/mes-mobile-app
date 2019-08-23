import { TestPermissionPeriod } from '../../providers/app-config/app-config.model';
import { ExaminerRole } from '../../providers/app-config/constants/examiner-role.constants';

export interface EnvironmentFile {
  isRemote: boolean;
  configUrl: string;
  daysToCacheJournalData: number;
  daysToCacheLogs: number;
  enableDevTools: boolean;
  logoutClearsTestPersistence?: boolean;
  logsPostApiKey: string;
  logsApiUrl: string;
  logsAutoSendInterval: number;

  authentication: {
    context: string;
    resourceUrl: string;
    clientId: string;
    redirectUrl: string;
    logoutUrl: string;
    employeeIdKey: string;
  };
}

export interface LocalEnvironmentFile extends EnvironmentFile {
  googleAnalyticsId: string;
  approvedDeviceIdentifiers: string[];
  timeTravelDate?: string;
  role: ExaminerRole;
  journal: {
    journalUrl: string;
    searchBookingUrl: string
    autoRefreshInterval: number;
    numberOfDaysToView: number;
    allowTests: boolean;
    allowedTestCategories: string[];
    enableLogoutButton: boolean;
    testPermissionPeriods: TestPermissionPeriod[]
  };
  dashboard: {
    enableTestReportPracticeMode: boolean;
    enableEndToEndPracticeMode: boolean;
  };
  tests: {
    testSubmissionUrl: string,
    autoSendInterval: number,
  };
  logs: {
    url: string,
    autoSendInterval: number;
  };
  requestTimeout: number;
}
