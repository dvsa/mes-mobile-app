import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppConfigProvider } from '../app-config';

import { environmentResponseMock } from '../__mocks__/environment-response.mock';
import { remoteEnvironmentMock } from '../__mocks__/environment.mock';
import { NetworkStateProvider } from '../../network-state/network-state';
import { NetworkStateProviderMock } from '../../network-state/__mocks__/network-state.mock';
import { DataStoreProvider } from '../../data-store/data-store';
import { DataStoreProviderMock } from '../../data-store/__mocks__/data-store.mock';
import { Platform } from 'ionic-angular';
import { PlatformMock } from 'ionic-mocks';

describe('App Config Provider', () => {

  let appConfig: AppConfigProvider;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProvider, environmentFile: remoteEnvironmentMock },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
      ],
    });

    appConfig = TestBed.get(AppConfigProvider);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadRemoteConfig', () => {
    it('should load remote config', fakeAsync(() => {
      appConfig.environmentFile = remoteEnvironmentMock;

      appConfig.loadRemoteConfig();
      tick();

      const request = httpMock.expectOne(remoteEnvironmentMock.configUrl);
      expect(request.request.method).toBe('GET');
      request.flush(environmentResponseMock);
    }));
  });
});
