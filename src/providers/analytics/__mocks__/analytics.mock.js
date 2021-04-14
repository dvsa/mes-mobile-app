var AnalyticsProviderMock = /** @class */ (function () {
    function AnalyticsProviderMock() {
        this.googleAnalyticsKey = 'UA-12345678';
        this.setCurrentPage = jasmine.createSpy('setCurrentPage');
        this.initialiseAnalytics = jasmine.createSpy('initialiseAnalytics').and.returnValue(Promise.resolve());
        this.logEvent = jasmine.createSpy('logEvent');
        this.addCustomDimension = jasmine.createSpy('addCustomDimension');
        this.logError = jasmine.createSpy('logError');
        this.logException = jasmine.createSpy('logException');
        this.setUserId = jasmine.createSpy('setUserId');
        this.setDeviceId = jasmine.createSpy('setDeviceId');
        this.getDescriptiveDate = jasmine.createSpy('getDescriptiveDate').and.returnValue('Tomorrow');
        this.getDiffDays = jasmine.createSpy('getDiffDays').and.returnValue(4);
    }
    return AnalyticsProviderMock;
}());
export { AnalyticsProviderMock };
//# sourceMappingURL=analytics.mock.js.map