import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { SearchProvider } from '../search';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { configureTestSuite } from 'ng-bullet';
describe('SearchProvider', function () {
    var searchProvider;
    var httpMock;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                SearchProvider,
                { provide: UrlProvider, useClass: UrlProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
            ],
        });
    });
    beforeEach(function () {
        httpMock = TestBed.get(HttpTestingController);
        searchProvider = TestBed.get(SearchProvider);
    });
    describe('driverNumberSearch', function () {
        it('should call the search endpoint with the provided driver number', function () {
            searchProvider.driverNumberSearch('12345').subscribe();
            httpMock.expectOne('https://www.example.com/api/v1/test-result?driverNumber=12345');
        });
    });
    describe('applicationReferenceSearch', function () {
        it('should call the search endpoint with the provided application reference', function () {
            searchProvider.applicationReferenceSearch('12345').subscribe();
            httpMock.expectOne('https://www.example.com/api/v1/test-result?applicationReference=12345');
        });
    });
    describe('advancedSearch', function () {
        it('should call the search endpoint with the correct values for all parameters', function () {
            var params = {
                startDate: '12-12-12',
                endDate: '12-12-12',
                staffNumber: '12345',
                costCode: 'abc',
                excludeAutoSavedTests: 'true',
            };
            searchProvider.advancedSearch(params).subscribe();
            httpMock.expectOne(
            // tslint:disable-next-line:max-line-length
            'https://www.example.com/api/v1/test-result?startDate=12-12-12&endDate=12-12-12&staffNumber=12345&dtcCode=abc&excludeAutoSavedTests=true');
        });
        it('should not add the paramters to the url if they are not provided', function () {
            searchProvider.advancedSearch({}).subscribe(function () {
                httpMock.expectOne('https://www.example.com/api/v1/test-result');
            });
        });
    });
    describe('getTestResult', function () {
        it('should call the search endpoint and get a test result back', function () {
            searchProvider.getTestResult('12345', '123456').subscribe();
            httpMock.expectOne('https://www.example.com/api/v1/test-result/12345/123456');
        });
    });
});
//# sourceMappingURL=search.spec.js.map