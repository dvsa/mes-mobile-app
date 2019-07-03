import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { SearchProvider } from '../search';
import { AdvancedSearchParams } from '../search.models';

describe('SearchProvider', () => {

  let searchProvider: SearchProvider;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        SearchProvider,
        { provide: UrlProvider, useClass: UrlProviderMock },
      ],
    });

    httpMock = TestBed.get(HttpTestingController);
    searchProvider = TestBed.get(SearchProvider);
  });

  describe('driverNumberSearch', () => {
    it('should call the search endpoint with the provided driver number', () => {
      searchProvider.driverNumberSearch('12345').subscribe();
      httpMock.expectOne('https://www.example.com/api/v1/test-result?driverNumber=12345&isLDTM=false');
    });
  });

  describe('applicationReferenceSearch', () => {
    it('should call the search endpoint with the provided application reference', () => {
      searchProvider.applicationReferenceSearch('12345').subscribe();
      httpMock.expectOne('https://www.example.com/api/v1/test-result?applicationReference=12345&isLDTM=false');
    });
  });

  describe('advancedSearch', () => {
    it('should call the search endpoint with the correct values for all parameters', () => {
      const params: AdvancedSearchParams = {
        isLDTM: true,
        startDate: '12-12-12',
        endDate: '12-12-12',
        staffNumber: '12345',
        costCode: 'abc',
      };

      searchProvider.advancedSearch(params).subscribe();

      httpMock.expectOne(
        // tslint:disable-next-line:max-line-length
        'https://www.example.com/api/v1/test-result?isLDTM=true&startDate=12-12-12&endDate=12-12-12&staffNumber=12345&dtcCode=abc',
      );
    });
    it('should not add the paramters to the url if they are not provided', () => {
      const params: AdvancedSearchParams = {
        isLDTM: false,
      };

      searchProvider.advancedSearch(params).subscribe(() => {
        httpMock.expectOne(
          'https://www.example.com/api/v1/test-result?isLDTM=false',
        );
      });
    });
  });

  describe('getTestResult', () => {
    it('should call the search endpoint and get a test result back', () => {
      searchProvider.getTestResult('12345', '123456').subscribe();
      httpMock.expectOne('https://www.example.com/api/v1/test-result/12345/123456');
    });
  });

});
