import { TestBed } from '@angular/core/testing';
import { DeviceAuthenticationProvider } from '../device-authentication';
import { Platform } from 'ionic-angular';
import { PlatformMock } from 'ionic-mocks';
import { configureTestSuite } from 'ng-bullet';

describe('Device Authentication Provider', () => {

  let deviceAuthenticationProvider: DeviceAuthenticationProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        DeviceAuthenticationProvider,
        { provide: Platform, useFactory: () => PlatformMock.instance() },
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
  });

});
