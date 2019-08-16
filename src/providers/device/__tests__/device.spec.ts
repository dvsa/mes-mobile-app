import { TestBed } from '@angular/core/testing';
import { DeviceProvider } from '../device';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { Device } from '@ionic-native/device';
import { DeviceMock } from '@ionic-native-mocks/device';
import { LogHelperMock } from '../../logs/__mocks__/logsHelper.mock';
import { StoreModule, Store } from '@ngrx/store';
import { LogHelper } from '../../logs/logsHelper';

describe('Device Provider', () => {

  let deviceProvider: DeviceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          appInfo: () => ({
            versionNumber: '5',
          }),
        }),
      ],
      providers: [
        DeviceProvider,
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: Device, useClass: DeviceMock },
        Store,
        { provide: LogHelper, useClass: LogHelperMock },
      ],
    });

    deviceProvider = TestBed.get(DeviceProvider);
  });

  describe('getDeviceType', () => {
    it('should return the device type', () => {
      spyOn(deviceProvider, 'getDeviceType').and.returnValue('iPad7,4');
      const deviceType = deviceProvider.getDeviceType();
      expect(deviceType).toBe('iPad7,4');
    });
  });

  describe('validDeviceType', () => {
    it('should return true if the device in supported devices list', () => {
      spyOn(deviceProvider, 'getDeviceType').and.returnValue('iPad7,4');
      const deviceValid = deviceProvider.validDeviceType();
      expect(deviceValid).toEqual(true);
    });
  });

  describe('validDeviceType', () => {
    it('should return false if the device is not in supported devices list', () => {
      spyOn(deviceProvider, 'getDeviceType').and.returnValue('nonIpad7,4');
      const deviceValid = deviceProvider.validDeviceType();
      expect(deviceValid).toEqual(false);
    });
  });

  describe('getUniqueDeviceId', () => {
    it('should return the unique device id', () => {
      spyOn(deviceProvider, 'getUniqueDeviceId').and.returnValue('A1234');
      const deviceId = deviceProvider.getUniqueDeviceId();
      expect(deviceId).toBe('A1234');
    });
  });

  describe('singleAppMode', () => {
    it('should return true when enabling single app mode', async () => {
      const result = await deviceProvider.enableSingleAppMode();
      expect(result).toBe(true);
    });
    it('should return true when disabling single app mode', async () => {
      const result = await deviceProvider.disableSingleAppMode();
      expect(result).toBe(true);
    });
  });

});
