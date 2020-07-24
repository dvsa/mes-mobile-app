import { TestBed } from '@angular/core/testing';
import { DeviceAuthenticationProvider } from '../device-authentication';
import { Platform } from 'ionic-angular';
import { PlatformMock } from 'ionic-mocks';
import { configureTestSuite } from 'ng-bullet';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';

describe('Device Authentication Provider', () => {

  let deviceAuthenticationProvider: DeviceAuthenticationProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        DeviceAuthenticationProvider,
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
      ],
    });
  });

  beforeEach(() => {
    deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
  });

  describe('triggerLockScreen', () => {
    it('should return true when successfully authenticated', async () => {
      const result = await deviceAuthenticationProvider.triggerLockScreen();
      expect(result).toBe(true);
    });

    it('should resolve immediately if the examiner role check passes', async () => {
      spyOn(deviceAuthenticationProvider.appConfig, 'getAppConfig').and.returnValue({ role: 'DLG' });
      const result = await deviceAuthenticationProvider.triggerLockScreen();
      expect(result).toBe(false);
    });
  });

});
