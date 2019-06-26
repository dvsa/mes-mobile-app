import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { SearchProvider } from '../search';

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
      httpMock.expectOne('https://www.example.com/api/v1/test-result?driverNumber=12345');
    });
  });

  describe('applicationReferenceSearch', () => {
    it('should call the search endpoint with the provided application reference', () => {
      searchProvider.applicationReferenceSearch('12345').subscribe();
      httpMock.expectOne('https://www.example.com/api/v1/test-result?applicationReference=12345');
    });
  });
});
