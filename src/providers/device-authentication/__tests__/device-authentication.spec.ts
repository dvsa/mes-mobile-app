import { TestBed } from '@angular/core/testing';
import { DeviceAuthenticationProvider } from '../device-authentication';
import { DeviceAuthenticationProviderMock } from '../__mocks__/device-authentication.mock';

describe('Lock Screen Provider', () => {

  let deviceAuthenticationProvider: DeviceAuthenticationProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
      ],
    });

    deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
  });

  describe('triggerLockScreen', () => {
    it('should return true when successfully authenticated', async () => {
      const result = await deviceAuthenticationProvider.triggerLockScreen();
      expect(result).toBe(true);
    });
  });

});
