export var LOGS_SERVICE_URL = 'https://www.example.com/api/v1/logs';
export var TEST_RESULT_SERVICE_URL = 'https://www.example.com/api/v1/test-result';
var UrlProviderMock = /** @class */ (function () {
    function UrlProviderMock() {
        this.getPersonalJournalUrl = jasmine.createSpy('getPersonalJournalUrl')
            .and
            .returnValue('https://www.example.com/api/v1/journals/12345678/personal');
        this.getLogsServiceUrl = jasmine.createSpy('getLogsServiceUrl')
            .and
            .returnValue(LOGS_SERVICE_URL);
        this.getTestResultServiceUrl = jasmine.createSpy('getTestResultServiceUrl')
            .and
            .returnValue(TEST_RESULT_SERVICE_URL);
        this.getRekeySearchUrl = jasmine.createSpy('getRekeySearchUrl')
            .and
            .returnValue('https://www.example.com/api/v1/journals/654321/search');
        this.getRekeyFindUserUrl = jasmine.createSpy('getRekeyFindUserUrl')
            .and
            .returnValue('https://www.example.com/api/v1/users/search/1234567');
    }
    return UrlProviderMock;
}());
export { UrlProviderMock };
//# sourceMappingURL=url.mock.js.map