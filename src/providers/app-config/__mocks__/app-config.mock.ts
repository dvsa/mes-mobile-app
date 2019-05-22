import { EnvironmentFile } from '../../../environment/models/environment.model';
import { localEnvironmentMock } from './environment.mock';
import { AppConfig } from '../app-config.model';

export class AppConfigProviderMock {

  environmentFile: EnvironmentFile = localEnvironmentMock;

  public initialiseAppConfig = jasmine.createSpy('initialiseAppConfig');

  public loadRemoteConfig = jasmine.createSpy('loadRemoteConfig')
    .and
    .returnValue(Promise.resolve());

  public getAppConfig(): AppConfig {
    return {
      configUrl: localEnvironmentMock.configUrl,
      googleAnalyticsId: localEnvironmentMock.googleAnalyticsId,
      daysToCacheJournalData: localEnvironmentMock.daysToCacheJournalData,
      daysToCacheLogs: localEnvironmentMock.daysToCacheLogs,
      logoutClearsTestPersistence: localEnvironmentMock.logoutClearsTestPersistence,
      authentication: {
        clientId: localEnvironmentMock.authentication.clientId,
        context: localEnvironmentMock.authentication.context,
        redirectUrl: localEnvironmentMock.authentication.redirectUrl,
        resourceUrl: localEnvironmentMock.authentication.resourceUrl,
        logoutUrl: localEnvironmentMock.authentication.logoutUrl,
        employeeIdKey: localEnvironmentMock.authentication.employeeIdKey,
      },
      approvedDeviceIdentifiers: localEnvironmentMock.approvedDeviceIdentifiers,
      timeTravelDate: localEnvironmentMock.timeTravelDate,
      journal: {
        journalUrl: localEnvironmentMock.journal.journalUrl,
        autoRefreshInterval: localEnvironmentMock.journal.autoRefreshInterval,
        numberOfDaysToView: localEnvironmentMock.journal.numberOfDaysToView,
        allowTests: localEnvironmentMock.journal.allowTests,
        allowedTestCategories: localEnvironmentMock.journal.allowedTestCategories,
        enableTestReportPracticeMode: localEnvironmentMock.journal.enableTestReportPracticeMode,
        enableEndToEndPracticeMode: localEnvironmentMock.journal.enableEndToEndPracticeMode,
        enableLogoutButton: localEnvironmentMock.journal.enableLogoutButton,
      },
      tests: {
        testSubmissionUrl: localEnvironmentMock.tests.testSubmissionUrl,
        autoSendInterval: localEnvironmentMock.tests.autoSendInterval,
      },
      logs: {
        url: localEnvironmentMock.logs.url,
        autoSendInterval: localEnvironmentMock.logs.autoSendInterval,
      },
    };
  }
}
