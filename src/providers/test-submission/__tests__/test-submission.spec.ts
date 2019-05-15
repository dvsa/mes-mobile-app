import { TestBed } from '@angular/core/testing';
import { TestSubmissionProvider } from '../test-submission';
import { UrlProvider } from '../../url/url';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';

describe('TestResultCalculatorProvider', () => {

  let testSubmissionProvider: TestSubmissionProvider;
  let httpMock: HttpTestingController;
  let urlProvider : UrlProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TestSubmissionProvider,
        { provide: UrlProvider, useClass: UrlProviderMock },
      ],
    });

    testSubmissionProvider = TestBed.get(TestSubmissionProvider);
    httpMock = TestBed.get(HttpTestingController);
    urlProvider = TestBed.get(UrlProvider);
  });

  describe('submitTests', () => {
    it('should attempt to submit a test', () => {
      testSubmissionProvider.submitTests([]).subscribe();

      httpMock.expectOne('https://www.example.com/api/v1/test-result');
      expect(urlProvider.getTestResultServiceUrl).toHaveBeenCalled();
    });
  });
});
