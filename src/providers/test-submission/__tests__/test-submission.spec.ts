import { TestBed } from '@angular/core/testing';
import { TestSubmissionProvider, TestToSubmit } from '../test-submission';
import { UrlProvider } from '../../url/url';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { gunzipSync } from 'zlib';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { HttpClient } from '@angular/common/http';

describe('TestSubmissionProvider', () => {

  let testSubmissionProvider: TestSubmissionProvider;
  let httpMock: HttpTestingController;
  let urlProvider: UrlProvider;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TestSubmissionProvider,
        HttpClient,
        { provide: UrlProvider, useClass: UrlProviderMock },
      ],
    });

    testSubmissionProvider = TestBed.get(TestSubmissionProvider);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    urlProvider = TestBed.get(UrlProvider);
    spyOn(testSubmissionProvider, 'compressData').and.callThrough();
    spyOn(testSubmissionProvider, 'removeNullFieldsDeep').and.callThrough();
    spyOn(testSubmissionProvider, 'submitTest').and.callThrough();
    spyOn(httpClient, 'post').and.callThrough();
  });

  describe('submitTests', () => {
    it('should attempt to submit a test', () => {
      testSubmissionProvider.submitTests([{
        index: 0,
        slotId: '',
        payload: {},
      }] as TestToSubmit[]).subscribe();

      httpMock.expectOne('https://www.example.com/api/v1/test-result');

      expect(httpClient.post).toHaveBeenCalledWith(
        'https://www.example.com/api/v1/test-result',
        // Compressed and base64 encoded string of and empty object
        'H4sIAAAAAAAAA6uuBQBDv6ajAgAAAA==',
        { observe: 'response' },
      );
      expect(urlProvider.getTestResultServiceUrl).toHaveBeenCalled();
      expect(testSubmissionProvider.compressData).toHaveBeenCalled();
      expect(testSubmissionProvider.removeNullFieldsDeep).toHaveBeenCalled();
      expect(testSubmissionProvider.submitTest).toHaveBeenCalledTimes(1);
    });
  });
  describe('compressData', () => {
    it('should successfully compress the provided data', () => {

      // ARRANGE
      const mockData: Partial<StandardCarTestCATBSchema> = {
        category: 'B',
        communicationPreferences: {
          updatedEmail: 'test@test.com',
          communicationMethod: 'Post',
          conductedLanguage: 'English',
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
  describe('removeNullFieldsDeep', () => {
    it('should successfully remove null props from the provided data', () => {

      // ARRANGE
      const mockData: Partial<StandardCarTestCATBSchema> = {
        category: 'B',
        activityCode: null,
        communicationPreferences: {
          updatedEmail: 'test@test.com',
          communicationMethod: 'Post',
          conductedLanguage: 'English',
        },
        instructorDetails: {
          registrationNumber: null,
        },
      };
      const expected = {
        category: 'B',
        id: '1022',
        communicationPreferences: {
          updatedEmail: 'test@test.com',
          communicationMethod: 'Post',
          conductedLanguage: 'English',
        },
        instructorDetails: {},
      };
      // ACT
      const result = testSubmissionProvider.removeNullFieldsDeep(mockData as StandardCarTestCATBSchema);
      // ASSERT
      expect(result).toEqual(expected);
    });
  });
});
