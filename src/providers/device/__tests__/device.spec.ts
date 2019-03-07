import { TestBed } from '@angular/core/testing';
import { DeviceProviderMock } from '../__mocks__/device.mock';
import { DeviceProvider } from '../device';

describe('Device Provider', () => {

  let device: DeviceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DeviceProvider, useClass: DeviceProviderMock },
      ],
    });

    device = TestBed.get(DeviceProvider);
  });

  describe('getDeviceType', () => {
    it('should return the device type', () => {
      const deviceType = device.getDeviceType();
      expect(deviceType).toBe('iPad7,4');
    });
  });

  describe('validDeviceType', () => {
    it('should return true if the device in supported devices list', () => {
      const deviceValid = device.validDeviceType();
      expect(deviceValid).toBeTruthy();
    });
  });

  describe('validDeviceType', () => {
    it('should return false if the device is not in supported devices list', () => {
      spyOn(device, 'getDeviceType').and.returnValue('nonIpad7,4');
      const deviceValid = device.validDeviceType();
      expect(deviceValid).toBeFalsy();
    });
  });

  describe('getUniqueDeviceId', () => {
    it('should return the unique device id', () => {
      const deviceId = device.getUniqueDeviceId();
      expect(deviceId).toBe('A1234');
    });
  });

});
