import { TestBed } from '@angular/core/testing';
import { AirwatchConfigProvider } from '../airwatch-config';
import { AppPreferences } from '@ionic-native/app-preferences';
import { AppPreferencesMock } from '../__mocks__/AppPreferencesMock';
import { AirwatchConfigModel } from '../airwatch-config.model';

export const APP_VERSION_NUMBER = '1.1.9';

describe('AirwatchConfigProvider', () => {
  describe('getAirwatchConfig', () => {

    let airwatchConfigProvider: AirwatchConfigProvider;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AirwatchConfigProvider,
          { provide: AppPreferences, useClass: AppPreferencesMock },
        ],
      });

      airwatchConfigProvider = TestBed.get(AirwatchConfigProvider);
    });

    it('should return config', (done) => {
      airwatchConfigProvider.getAirwatchConfig().subscribe((config:  AirwatchConfigModel) => {
        expect(config.configUrl).toBe('configUrl');
        expect(config.authenticationContext).toBe('authenticationContext');
        expect(config.resourceUrl).toBe('resourceUrl');
        expect(config.clientId).toBe('clientId');
        expect(config.redirectUrl).toBe('redirectUrl');
        expect(config.logoutUrl).toBe('logoutUrl');
        expect(config.employeeIdKey).toBe('employeeIdKey');
        done();
      });
    });
  });
});
