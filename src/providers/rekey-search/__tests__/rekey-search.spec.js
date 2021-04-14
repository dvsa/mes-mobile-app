import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RekeySearchProvider } from '../rekey-search';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { configureTestSuite } from 'ng-bullet';
describe('RekeySearchProvider', function () {
    var rekeySearchProvider;
    var httpMock;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                RekeySearchProvider,
                { provide: UrlProvider, useClass: UrlProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
            ],
        });
    });
    beforeEach(function () {
        httpMock = TestBed.get(HttpTestingController);
        rekeySearchProvider = TestBed.get(RekeySearchProvider);
    });
    describe('getTest', function () {
        it('should call the rekey search endpoint with the provided staff number and app ref', function () {
            var rekeySearchParams = {
                applicationReference: '123456',
                staffNumber: '654321',
            };
            rekeySearchProvider.getBooking(rekeySearchParams).subscribe();
            httpMock.expectOne('https://www.example.com/api/v1/journals/654321/search?appRef=123456');
        });
    });
});
//# sourceMappingURL=rekey-search.spec.js.map