import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppConfigProvider } from '../app-config';

import { environmentResponseMock } from '../__mocks__/environment-response.mock';
import { remoteEnvironmentMock, localEnvironmentMock } from '../__mocks__/environment.mock';

describe('App Config Provider', () => {

  let appConfig: AppConfigProvider;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AppConfigProvider, useClass: AppConfigProvider, environmentFile: remoteEnvironmentMock }
      ],
    });

    appConfig = TestBed.get(AppConfigProvider);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('refreshConfigSettings', () => {
    it('should load local config', () => {
      appConfig.environmentFile = localEnvironmentMock;

      appConfig.refreshConfigSettings();

      expect(appConfig.getAppConfig().googleAnalyticsId).toBe('local-ga-id');
      expect(appConfig.getAppConfig().userIdDimensionIndex).toBe(2018);

    });
    it('should load remote config', () => {
      appConfig.environmentFile = remoteEnvironmentMock;

      appConfig.refreshConfigSettings().subscribe(() => {
        expect(appConfig.getAppConfig().googleAnalyticsId).toBe('TEST-GA-ID');
        expect(appConfig.getAppConfig().userIdDimensionIndex).toBe(99);
      });

      const request = httpMock.expectOne(remoteEnvironmentMock.remoteSettingsUrl);
      expect(request.request.method).toBe('GET');

      request.flush(environmentResponseMock);
    });
  });

});
