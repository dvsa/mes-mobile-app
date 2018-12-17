import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppConfigProvider } from '../app-config';

import { environmentResponseMock } from '../__mocks__/environment-response.mock';

describe('App Config Provider', () => {

  let appConfig: AppConfigProvider;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppConfigProvider],
    });

    appConfig = TestBed.get(AppConfigProvider);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getRemoteData', () => {
    it('should get remote data', () => {
      appConfig.readEnvironments();
      appConfig.getRemoteData().subscribe(() => {
        expect(appConfig.getGoogleAnalyticsKey()).toBe('TEST-GA-ID');
        expect(appConfig.getGoogleAnalyticsUserIdDimension()).toBe(99);
      });

      const request = httpMock.expectOne(appConfig.dynamicAppSettingsUrl);
      expect(request.request.method).toBe('GET');

      request.flush(environmentResponseMock);
    });
  });

  describe('readEnviroments', () => {
    it('should read Enviroments', () => {
      appConfig.readEnvironments()

      expect(appConfig.isRemote).toBeDefined();
      expect(appConfig.dynamicAppSettingsUrl).toBeDefined();
      expect(appConfig.getGoogleAnalyticsKey).toBeDefined();
      expect(appConfig.userIdDimensionIndex).toBeDefined();
    });
  });

});
