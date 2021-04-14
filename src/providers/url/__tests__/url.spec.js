import { TestBed } from '@angular/core/testing';
import { UrlProvider } from '../url';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { configureTestSuite } from 'ng-bullet';
describe('UrlProvider', function () {
    var urlProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                UrlProvider,
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
            ],
        });
    });
    beforeEach(function () {
        urlProvider = TestBed.get(UrlProvider);
    });
    describe('getPersonalJournalUrl', function () {
        it('should format the URL template from the AppConfigProvider with the provided staffNumber', function () {
            var url = urlProvider.getPersonalJournalUrl('12345678');
            expect(url).toBe('https://www.example.com/api/v1/journals/12345678/personal');
        });
        it('should format the URL with an unmapped staffNumber when no staffNumber is provided', function () {
            var url;
            url = urlProvider.getPersonalJournalUrl(null);
            expect(url).toBe('https://www.example.com/api/v1/journals/00000000/personal');
            url = urlProvider.getPersonalJournalUrl(undefined);
            expect(url).toBe('https://www.example.com/api/v1/journals/00000000/personal');
        });
    });
    describe('getLogsServiceUrl', function () {
        it('should return the correct url', function () {
            var url = urlProvider.getLogsServiceUrl();
            expect(url).toBe('https://www.example.com/api/v1/logs');
        });
    });
    describe('getTestResultServiceUrl', function () {
        it('should return the correct url', function () {
            var url = urlProvider.getTestResultServiceUrl();
            expect(url).toBe('https://www.example.com/api/v1/test-result');
        });
    });
    describe('getRekeySearchlUrl', function () {
        it('should format the URL template from the AppConfigProvider with the provided staffNumber', function () {
            var url = urlProvider.getRekeySearchUrl('12345678');
            expect(url).toBe('https://www.example.com/api/v1/journals/12345678/search');
        });
        it('should format the URL with an unmapped staffNumber when no staffNumber is provided', function () {
            var urlWithNull = urlProvider.getRekeySearchUrl(null);
            expect(urlWithNull).toBe('https://www.example.com/api/v1/journals/00000000/search');
            var urlWithUndefined = urlProvider.getRekeySearchUrl(undefined);
            expect(urlWithUndefined).toBe('https://www.example.com/api/v1/journals/00000000/search');
        });
    });
});
//# sourceMappingURL=url.spec.js.map