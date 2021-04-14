import { JournalProvider } from './../../journal/journal';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { Platform } from 'ionic-angular';
import { PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../authentication';
import { AuthenticationProviderMock } from '../__mocks__/authentication.mock';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { of } from 'rxjs';
import { DataStoreProvider } from '../../data-store/data-store';
import { DataStoreProviderMock } from '../../data-store/__mocks__/data-store.mock';
import { NetworkStateProvider } from '../../network-state/network-state';
import { NetworkStateProviderMock } from '../../network-state/__mocks__/network-state.mock';
import { DateTimeProvider } from '../../date-time/date-time';
import { DateTimeProviderMock } from '../../date-time/__mocks__/date-time.mock';
describe('Authentication interceptor', function () {
    var httpMock;
    var interceptor;
    var journalProvider;
    var platform;
    var urlProvider;
    var journalUrl;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthInterceptor,
                JournalProvider,
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: UrlProvider, useClass: UrlProviderMock },
                { provide: DataStoreProvider, useClass: DataStoreProviderMock },
                { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
            ],
        });
        platform = TestBed.get(Platform);
        httpMock = TestBed.get(HttpTestingController);
        interceptor = TestBed.get(AuthInterceptor);
        journalProvider = TestBed.get(JournalProvider);
        urlProvider = TestBed.get(UrlProvider);
        journalUrl = urlProvider.getPersonalJournalUrl('');
    });
    afterEach(function () { return httpMock.verify(); });
    describe('Interceptor', function () {
        it('should compile', function () {
            expect(interceptor).toBeDefined();
        });
        it('should not modify the request if not on ios', function () {
            platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
            journalProvider.getJournal(null).subscribe(function (res) { }, function (err) { });
            var httpRequest = httpMock.expectOne(journalUrl);
            expect(httpRequest.request.headers.has('Authorization')).toBe(false);
        });
        it('should add the authentication header to the request if running on ios', function (done) {
            platform.is = jasmine.createSpy('platform.is').and.returnValue(true);
            var next = {
                handle: function (request) {
                    expect(request.headers.has('Authorization')).toEqual(true);
                    expect(request.headers.get('Authorization')).toEqual('token');
                    return of({});
                },
            };
            var req = new HttpRequest('GET', journalUrl);
            interceptor.intercept(req, next).subscribe(function (obj) { return done(); });
        });
    });
});
//# sourceMappingURL=interceptor.spec.js.map