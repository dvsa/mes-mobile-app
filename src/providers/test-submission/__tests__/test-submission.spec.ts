import { TestBed } from '@angular/core/testing';
import { TestSubmissionProvider } from '../test-submission';
import { UrlProvider } from '../../url/url';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { gunzipSync } from 'zlib';

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
  describe('compressData', () => {
    it('should successfully compress the provided data', () => {

      // ARRANGE
      const mockData = {
        tests: {
          startedTests: {
            1003: {
              candidate: {
                age: 56,
                candidateId: 103,
                candidateName: {
                  firstName: 'Jane',
                  lastName: 'Doe',
                  title: 'Mrs',
                },
                driverNumber: 'DOEXX625220A99HC',
                gender: 'Female',
                mobileTelephone: '07654 123456',
              },
            },
          },
        },
      };
      // ACT
      const result = testSubmissionProvider.compressData(mockData);
      // ASSERT
      const gzippedBytes = Buffer.from(result, 'base64');
      const unzippedJson = gunzipSync(gzippedBytes).toString();
      const json = JSON.parse(unzippedJson);
      expect(json).toEqual(mockData);
    });
  });
});
