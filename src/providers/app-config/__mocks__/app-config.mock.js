import { localEnvironmentMock } from './environment.mock';
var AppConfigProviderMock = /** @class */ (function () {
    function AppConfigProviderMock() {
        this.environmentFile = localEnvironmentMock;
        this.initialiseAppConfig = jasmine.createSpy('initialiseAppConfig');
        this.loadRemoteConfig = jasmine.createSpy('loadRemoteConfig')
            .and
            .returnValue(Promise.resolve());
        this.getDebugMode = jasmine.createSpy('getDebugMode')
            .and
            .returnValue(Promise.resolve());
    }
    AppConfigProviderMock.prototype.getAppConfig = function () {
        return {
            configUrl: localEnvironmentMock.configUrl,
            googleAnalyticsId: localEnvironmentMock.googleAnalyticsId,
            daysToCacheLogs: localEnvironmentMock.daysToCacheLogs,
            logoutClearsTestPersistence: localEnvironmentMock.logoutClearsTestPersistence,
            logsPostApiKey: localEnvironmentMock.logsPostApiKey,
            logsApiUrl: localEnvironmentMock.logsApiUrl,
            logsAutoSendInterval: localEnvironmentMock.logsAutoSendInterval,
            authentication: {
                clientId: localEnvironmentMock.authentication.clientId,
                context: localEnvironmentMock.authentication.context,
                redirectUrl: localEnvironmentMock.authentication.redirectUrl,
                resourceUrl: localEnvironmentMock.authentication.resourceUrl,
                logoutUrl: localEnvironmentMock.authentication.logoutUrl,
                employeeIdKey: localEnvironmentMock.authentication.employeeIdKey,
                employeeNameKey: localEnvironmentMock.employeeNameKey,
            },
            approvedDeviceIdentifiers: localEnvironmentMock.approvedDeviceIdentifiers,
            timeTravelDate: localEnvironmentMock.timeTravelDate,
            role: localEnvironmentMock.role,
            journal: {
                journalUrl: localEnvironmentMock.journal.journalUrl,
                searchBookingUrl: localEnvironmentMock.journal.searchBookingUrl,
                delegatedExaminerSearchBookingUrl: localEnvironmentMock.journal.delegatedExaminerSearchBookingUrl,
                autoRefreshInterval: localEnvironmentMock.journal.autoRefreshInterval,
                numberOfDaysToView: localEnvironmentMock.journal.numberOfDaysToView,
                daysToCacheJournalData: localEnvironmentMock.journal.daysToCacheJournalData,
                allowTests: localEnvironmentMock.journal.allowTests,
                allowedTestCategories: localEnvironmentMock.journal.allowedTestCategories,
                enableTestReportPracticeMode: localEnvironmentMock.journal.enableTestReportPracticeMode,
                enableEndToEndPracticeMode: localEnvironmentMock.journal.enableEndToEndPracticeMode,
                enableLogoutButton: localEnvironmentMock.journal.enableLogoutButton,
                testPermissionPeriods: localEnvironmentMock.journal.testPermissionPeriods,
            },
            tests: {
                testSubmissionUrl: localEnvironmentMock.tests.testSubmissionUrl,
                autoSendInterval: localEnvironmentMock.tests.autoSendInterval,
            },
            user: {
                findUserUrl: localEnvironmentMock.user.findUserUrl,
            },
            requestTimeout: localEnvironmentMock.requestTimeout,
        };
    };
    return AppConfigProviderMock;
}());
export { AppConfigProviderMock };
//# sourceMappingURL=app-config.mock.js.map