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
import { StoreModule, Store } from '@ngrx/store';
import { LogHelper } from '../../logs/logsHelper';
import { Device } from '@ionic-native/device';
import { LogHelperMock } from '../../logs/__mocks__/logsHelper.mock';
import { AppInfoProvider } from '../../app-info/app-info';
import { AppInfoProviderMock } from '../../app-info/__mocks__/app-info.mock';
import { SchemaValidatorProvider } from '../../schema-validator/schema-validator';
import { SchemaValidatorProviderMock } from '../../schema-validator/__mocks__/schema-validator.mock';
import { configureTestSuite } from 'ng-bullet';
describe('App Config Provider', function () {
    var appConfig;
    var httpMock;
    var platform;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({
                    appInfo: function () { return ({
                        versionNumber: '5',
                    }); },
                }),
            ],
            providers: [
                { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
                { provide: DataStoreProvider, useClass: DataStoreProviderMock },
                { provide: SchemaValidatorProvider, useClass: SchemaValidatorProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProvider, environmentFile: remoteEnvironmentMock },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AppInfoProvider, useClass: AppInfoProviderMock },
                Store,
                { provide: LogHelper, useClass: LogHelperMock },
                Device,
            ],
        });
    });
    beforeEach(function () {
        appConfig = TestBed.get(AppConfigProvider);
        httpMock = TestBed.get(HttpTestingController);
        platform = TestBed.get(Platform);
        appConfig.isDebugMode = true;
        spyOn(appConfig, 'getDebugMode').and.returnValue(Promise.resolve());
    });
    afterEach(function () {
        httpMock.verify();
    });
    describe('initialiseAppConfig', function () {
        it('should run loadMangedConfig() when platform is Ios', fakeAsync(function () {
            platform.is = jasmine.createSpy('platform.is').and.returnValue(true);
            appConfig.loadManagedConfig = jasmine.createSpy('appConfig.loadManagedConfig');
            appConfig.initialiseAppConfig();
            tick();
            expect(appConfig.loadManagedConfig).toHaveBeenCalled();
        }));
        it('should not run loadMangedConfig() when platform is not ios', fakeAsync(function () {
            platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
            appConfig.loadManagedConfig = jasmine.createSpy('appConfig.loadManagedConfig');
            appConfig.initialiseAppConfig();
            tick();
            expect(appConfig.loadManagedConfig).toHaveBeenCalledTimes(0);
        }));
    });
    describe('loadRemoteConfig', function () {
        it('should load remote config', fakeAsync(function () {
            appConfig.environmentFile = remoteEnvironmentMock;
            appConfig.loadRemoteConfig();
            tick();
            var request = httpMock.expectOne(remoteEnvironmentMock.configUrl + "?app_version=1");
            expect(request.request.method).toBe('GET');
            request.flush(environmentResponseMock);
        }));
    });
    describe('loadMangedConfig', function () {
        it('should load managed config and update environmentFile', function () {
            appConfig.loadManagedConfig();
            expect(appConfig.environmentFile.configUrl).toBe('AppConfigMock');
        });
    });
});
//# sourceMappingURL=app-config.spec.js.map