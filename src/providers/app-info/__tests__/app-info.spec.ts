import { TestBed } from '@angular/core/testing';
import { AppInfoProvider } from '../app-info';
import { AppVersion } from '@ionic-native/app-version';
import { AppVersionMock } from '../__mocks__/app-version.mock';

export const APP_VERSION_NUMBER = '1.1.9';

describe('AppInfoProvider', () => {
  describe('getVersionNumber', () => {
    let appInfoProvider: AppInfoProvider;
    let appVersionMock: AppVersionMock;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AppInfoProvider,
          { provide: AppVersion, useClass: AppVersionMock },
        ],
      });

      appInfoProvider = TestBed.get(AppInfoProvider);
      appVersionMock = TestBed.get(AppVersion);
    });

    it('should obtain the version number from app version native plugin', () => {
      appInfoProvider.getVersionNumber().subscribe();

      expect(appVersionMock.getVersionNumber).toHaveBeenCalled();
    });

    it('should return version number into an observable', (done) => {
      appInfoProvider.getVersionNumber().subscribe((versionNumber) => {
        expect(versionNumber).toBe(APP_VERSION_NUMBER);
        done();
      });
    });
  });
});
