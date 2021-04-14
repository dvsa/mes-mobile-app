import { async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, LoadingController, AlertController, } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, SplashScreenMock, LoadingControllerMock, AlertControllerMock, } from 'ionic-mocks';
import { Store, StoreModule } from '@ngrx/store';
import { AppModule } from '../../../app/app.module';
import { LoginPage } from '../login';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationError } from '../../../providers/authentication/authentication.constants';
import { By } from '@angular/platform-browser';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import { NetworkStateProvider } from '../../../providers/network-state/network-state';
import { NetworkStateProviderMock } from '../../../providers/network-state/__mocks__/network-state.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { DataStoreProvider } from '../../../providers/data-store/data-store';
import { DataStoreProviderMock } from '../../../providers/data-store/__mocks__/data-store.mock';
import { SecureStorage } from '@ionic-native/secure-storage';
import { SecureStorageMock } from '@ionic-native-mocks/secure-storage';
import { LoadLog, StartSendingLogs } from '../../../modules/logs/logs.actions';
import { StartSendingCompletedTests } from '../../../modules/tests/tests.actions';
import { DASHBOARD_PAGE } from '../../page-names.constants';
import { LoadEmployeeId, LoadConfigSuccess } from '../../../modules/app-info/app-info.actions';
import { AppConfigError } from '../../../providers/app-config/app-config.constants';
import { LogHelper } from '../../../providers/logs/logsHelper';
import { LogHelperMock } from '../../../providers/logs/__mocks__/logsHelper.mock';
import { configureTestSuite } from 'ng-bullet';
describe('LoginPage', function () {
    var fixture;
    var component;
    var navController;
    var splashScreen;
    var authenticationProvider;
    var appConfigProvider;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [LoginPage],
            imports: [
                IonicModule,
                AppModule,
                StoreModule.forRoot({}),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: SplashScreen, useFactory: function () { return SplashScreenMock.instance(); } },
                { provide: LoadingController, useFactory: function () { return LoadingControllerMock.instance(); } },
                { provide: AlertController, useFactory: function () { return AlertControllerMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: DeviceProvider, useClass: DeviceProviderMock },
                { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: DataStoreProvider, useClass: DataStoreProviderMock },
                { provide: SecureStorage, useClass: SecureStorageMock },
                { provide: LogHelper, useClass: LogHelperMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        splashScreen = TestBed.get(SplashScreen);
        authenticationProvider = TestBed.get(AuthenticationProvider);
        appConfigProvider = TestBed.get(AppConfigProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        it('should login successfully', fakeAsync(function () {
            component.platform.ready =
                jasmine.createSpy('platform.ready').and.returnValue(Promise.resolve());
            component.authenticationProvider.login =
                jasmine.createSpy('authenticationProvider.login').and.returnValue(Promise.resolve());
            component.initialisePersistentStorage =
                jasmine.createSpy('component.initialisePersistentStorage').and.callThrough();
            component.handleLoadingUI =
                jasmine.createSpy('component.handleLoadingUI').and.callThrough();
            component.login();
            tick();
            expect(component.handleLoadingUI).toHaveBeenCalledWith(true);
            expect(component.initialisePersistentStorage).toHaveBeenCalled();
            expect(appConfigProvider.loadRemoteConfig).toHaveBeenCalled();
            expect(navController.setRoot).toHaveBeenCalledWith(DASHBOARD_PAGE);
            expect(component.hasUserLoggedOut).toEqual(false);
            expect(splashScreen.hide).toHaveBeenCalled();
        }));
        it('should fail to login gracefully', fakeAsync(function () {
            component.platform.ready =
                jasmine.createSpy('platform.ready').and.returnValue(Promise.resolve());
            component.initialisePersistentStorage =
                jasmine.createSpy('component.initialisePersistentStorage').and.returnValue(Promise.resolve());
            authenticationProvider.login =
                jasmine.createSpy('authenticationProvider.login')
                    .and.returnValue(Promise.reject(AuthenticationError.NO_INTERNET));
            component.handleLoadingUI =
                jasmine.createSpy('component.handleLoadingUI').and.callThrough();
            spyOn(component.authenticationProvider, 'isAuthenticated').and.returnValue(Promise.resolve(false));
            component.login();
            expect(component.loadingSpinner).toEqual(null);
            expect(component.appInitError === AuthenticationError.NO_INTERNET);
            expect(component.hasUserLoggedOut).toEqual(false);
            expect(splashScreen.hide).toHaveBeenCalled();
            tick();
        }));
        it('should login successfully but display a message when the user is not authorised ', fakeAsync(function () {
            component.platform.ready =
                jasmine.createSpy('platform.ready').and.returnValue(Promise.resolve());
            component.authenticationProvider.login =
                jasmine.createSpy('authenticationProvider.login').and.returnValue(Promise.resolve());
            component.initialisePersistentStorage =
                jasmine.createSpy('component.initialisePersistentStorage').and.callThrough();
            component.appConfigProvider.loadRemoteConfig =
                jasmine.createSpy('appConfigProvider.loadRemoteConfig')
                    .and.returnValue(Promise.reject('user not authorised'));
            component.login();
            tick();
            expect(appConfigProvider.loadRemoteConfig).toHaveBeenCalled();
            expect(component.hasUserLoggedOut).toEqual(false);
            expect(component.appInitError === AuthenticationError.USER_NOT_AUTHORISED);
            expect(store$.dispatch).toHaveBeenCalledWith(new StartSendingLogs());
            expect(splashScreen.hide).toHaveBeenCalled();
        }));
        it('should return true for isInternetConnectError when criteria is met', function () {
            component.appInitError = AuthenticationError.NO_INTERNET;
            component.hasUserLoggedOut = false;
            expect(component.isInternetConnectionError()).toEqual(true);
        });
        it('should return false for isInternetConnectError when criteria is not met', function () {
            component.appInitError = AuthenticationError.NO_INTERNET;
            component.hasUserLoggedOut = true;
            expect(component.isInternetConnectionError()).toEqual(false);
            component.appInitError = undefined;
            component.hasUserLoggedOut = false;
            expect(component.isInternetConnectionError()).toEqual(false);
        });
        it('should return true for isUserCancelledError when criteria is met', function () {
            component.appInitError = AuthenticationError.USER_CANCELLED;
            component.hasUserLoggedOut = false;
            expect(component.isUserCancelledError()).toEqual(true);
        });
        it('should return false for isUserCancelledError when criteria is not met', function () {
            component.appInitError = AuthenticationError.USER_CANCELLED;
            component.hasUserLoggedOut = true;
            expect(component.isUserCancelledError()).toEqual(false);
            component.appInitError = undefined;
            component.hasUserLoggedOut = false;
            expect(component.isUserCancelledError()).toEqual(false);
        });
        it('should return true for isUnknownError when criteria is met', function () {
            component.appInitError = AuthenticationError.NO_RESPONSE;
            component.hasUserLoggedOut = false;
            expect(component.isUnknownError()).toEqual(true);
        });
        it('should return false for isUnknownError when criteria is not met', function () {
            component.appInitError = AuthenticationError.USER_CANCELLED;
            component.hasUserLoggedOut = false;
            expect(component.isUnknownError()).toEqual(false);
            component.appInitError = undefined;
            component.hasUserLoggedOut = true;
            expect(component.isUnknownError()).toEqual(false);
        });
        it('should return true for isUserNotAuthorised when criteria is met', function () {
            component.appInitError = AuthenticationError.USER_NOT_AUTHORISED;
            component.hasUserLoggedOut = false;
            expect(component.isUserNotAuthorised()).toEqual(true);
        });
        it('should return true for isInvalidAppVersionError when criteria is met', function () {
            component.appInitError = AppConfigError.INVALID_APP_VERSION;
            component.hasUserLoggedOut = false;
            expect(component.isInvalidAppVersionError()).toEqual(true);
        });
        it("\n      should dispatch LOAD_LOG,\n      START_SENDING_LOGS,\n      START_SENDING_COMPLETED_LOGS,\n      LOAD_EMPLOYEE_ID and\n      LOAD_CONFIG_SUCCESS actions\n      ", fakeAsync(function () {
            component.login();
            tick();
            expect(store$.dispatch).toHaveBeenCalledWith(new LoadLog());
            expect(store$.dispatch).toHaveBeenCalledWith(new StartSendingLogs());
            expect(store$.dispatch).toHaveBeenCalledWith(new StartSendingCompletedTests());
            expect(store$.dispatch).toHaveBeenCalledWith(new LoadEmployeeId('12345678'));
            expect(store$.dispatch).toHaveBeenCalledWith(new LoadConfigSuccess());
        }));
    });
    describe('Async order of events in the login() method', function () {
        beforeEach(function () {
            component.platform.ready = jasmine.createSpy('platform.ready');
            component.initialisePersistentStorage = jasmine.createSpy('component.initialisePersistentStorage');
            component.initialiseAppConfig = jasmine.createSpy('component.initialiseAppConfig');
            component.initialiseAuthentication = jasmine.createSpy('component.initialiseAuthentication');
            component.authenticationProvider.login = jasmine.createSpy('authenticationProvider.login');
            component.authenticationProvider.expireTokens = jasmine.createSpy('authenticationProvider.expireTokens ');
            component.appConfigProvider.loadRemoteConfig = jasmine.createSpy('appConfigProvider.loadRemoteConfig');
            component.analytics.initialiseAnalytics = jasmine.createSpy('analytics.initialiseAnalytics');
            component.validateDeviceType = jasmine.createSpy('component.validateDeviceType');
        });
        it('should not call any further methods when platform.ready() fails', fakeAsync(function () {
            component.platform.ready = jasmine.createSpy('platform.ready').and.returnValue(Promise.reject(''));
            component.login();
            tick();
            // Shouldn't be called
            expect(component.initialiseAppConfig).not.toHaveBeenCalled();
            expect(component.initialiseAuthentication).not.toHaveBeenCalled();
            expect(component.authenticationProvider.expireTokens).not.toHaveBeenCalled();
            expect(component.authenticationProvider.login).not.toHaveBeenCalled();
            expect(component.initialisePersistentStorage).not.toHaveBeenCalled();
            expect(component.appConfigProvider.loadRemoteConfig).not.toHaveBeenCalled();
            expect(component.analytics.initialiseAnalytics).not.toHaveBeenCalled();
            expect(component.validateDeviceType).not.toHaveBeenCalled();
        }));
        it('should not call any further methods when initialiseAppConfig() fails', fakeAsync(function () {
            component.initialiseAppConfig =
                jasmine.createSpy('component.initialiseAppConfig').and.returnValue(Promise.reject(''));
            component.login();
            tick();
            // Should be called
            expect(component.platform.ready).toHaveBeenCalled();
            // Shouldn't be called
            expect(component.initialiseAuthentication).not.toHaveBeenCalled();
            expect(component.authenticationProvider.expireTokens).not.toHaveBeenCalled();
            expect(component.authenticationProvider.login).not.toHaveBeenCalled();
            expect(component.initialisePersistentStorage).not.toHaveBeenCalled();
            expect(component.appConfigProvider.loadRemoteConfig).not.toHaveBeenCalled();
            expect(component.analytics.initialiseAnalytics).not.toHaveBeenCalled();
            expect(component.validateDeviceType).not.toHaveBeenCalled();
        }));
        it('should not call any further methods when authenticationProvider.login() fails', fakeAsync(function () {
            spyOn(component.authenticationProvider, 'isAuthenticated').and.returnValue(Promise.resolve(false));
            component.authenticationProvider.login =
                jasmine.createSpy('authenticationProvider.login').and.returnValue(Promise.reject(''));
            component.login();
            tick();
            // Should be called
            expect(component.platform.ready).toHaveBeenCalled();
            expect(component.initialiseAppConfig).toHaveBeenCalled();
            expect(component.initialisePersistentStorage).toHaveBeenCalled();
            expect(component.authenticationProvider.expireTokens).toHaveBeenCalled();
            // Shouldn't be called
            expect(component.appConfigProvider.loadRemoteConfig).not.toHaveBeenCalled();
            expect(component.analytics.initialiseAnalytics).not.toHaveBeenCalled();
            expect(component.validateDeviceType).not.toHaveBeenCalled();
        }));
        it('should not call any further methods when initialisePersistentStorage() fails', fakeAsync(function () {
            component.initialisePersistentStorage =
                jasmine.createSpy('component.initialisePersistentStorage').and.returnValue(Promise.reject(''));
            component.login();
            tick();
            // Should be called
            expect(component.platform.ready).toHaveBeenCalled();
            expect(component.initialiseAppConfig).toHaveBeenCalled();
            expect(component.initialisePersistentStorage).toHaveBeenCalled();
            // Shouldn't be called
            expect(component.authenticationProvider.expireTokens).not.toHaveBeenCalled();
            expect(component.appConfigProvider.loadRemoteConfig).not.toHaveBeenCalled();
            expect(component.analytics.initialiseAnalytics).not.toHaveBeenCalled();
            expect(component.validateDeviceType).not.toHaveBeenCalled();
        }));
        it('should not call any further methods when loadRemoteConfig() fails', fakeAsync(function () {
            component.appConfigProvider.loadRemoteConfig =
                jasmine.createSpy('component.appConfigProvider.loadRemoteConfig').and.returnValue(Promise.reject(''));
            component.login();
            tick();
            // Should be called
            expect(component.platform.ready).toHaveBeenCalled();
            expect(component.initialiseAppConfig).toHaveBeenCalled();
            expect(component.initialisePersistentStorage).toHaveBeenCalled();
            expect(component.authenticationProvider.expireTokens).toHaveBeenCalled();
            expect(component.appConfigProvider.loadRemoteConfig).toHaveBeenCalled();
            // Shouldn't be called
            expect(component.analytics.initialiseAnalytics).not.toHaveBeenCalled();
            expect(component.validateDeviceType).not.toHaveBeenCalled();
        }));
    });
    describe('DOM', function () {
        it('should show the correct div if user has logged out', function () {
            component.hasUserLoggedOut = true;
            fixture.detectChanges();
            var tags = fixture.debugElement.queryAll(By.css('h2'));
            expect(tags.length).toBe(1);
            expect(tags[0].nativeElement.textContent).toContain('signed out');
        });
        it('should show the correct div if user has an internet connection error', function () {
            component.hasUserLoggedOut = false;
            component.appInitError = AuthenticationError.NO_INTERNET;
            fixture.detectChanges();
            var tags = fixture.debugElement.queryAll(By.css('h2'));
            expect(tags.length).toBe(1);
            expect(tags[0].nativeElement.textContent).toContain('offline');
        });
        it('should show the correct div if user has an user cancelled error', function () {
            component.hasUserLoggedOut = false;
            component.appInitError = AuthenticationError.USER_CANCELLED;
            fixture.detectChanges();
            var tags = fixture.debugElement.queryAll(By.css('h2'));
            expect(tags.length).toBe(1);
            expect(tags[0].nativeElement.textContent).toContain('cancelled sign in');
        });
        it('should show the correct div if user has an internet connection error', function () {
            component.hasUserLoggedOut = false;
            component.appInitError = AuthenticationError.NO_RESPONSE;
            fixture.detectChanges();
            var tags = fixture.debugElement.queryAll(By.css('h2'));
            expect(tags.length).toBe(1);
            expect(tags[0].nativeElement.textContent).toContain('Sorry, something went wrong');
        });
        it('should show the correct div if user is not authorised to use the app', function () {
            component.hasUserLoggedOut = false;
            component.appInitError = AuthenticationError.USER_NOT_AUTHORISED;
            fixture.detectChanges();
            var tags = fixture.debugElement.queryAll(By.css('h2'));
            expect(tags.length).toBe(1);
            expect(tags[0].nativeElement.textContent).toContain('not authorised to use this app');
        });
        it('should show the correct div if user has an old version of the app', function () {
            component.hasUserLoggedOut = false;
            component.appInitError = AppConfigError.INVALID_APP_VERSION;
            fixture.detectChanges();
            var tags = fixture.debugElement.queryAll(By.css('h2'));
            expect(tags.length).toBe(1);
            expect(tags[0].nativeElement.textContent).toContain('Unsupported application version');
        });
        it('should display Logout button if not logged out and login has not been cancelled', function () {
            component.hasUserLoggedOut = false;
            fixture.detectChanges();
            var logoutButton = fixture.debugElement.queryAll(By.css('#logout-button'));
            expect(logoutButton.length).toBe(1);
        });
        it('should not display Logout button if logged out', function () {
            component.hasUserLoggedOut = true;
            fixture.detectChanges();
            var logoutButton = fixture.debugElement.queryAll(By.css('#logout-button'));
            expect(logoutButton.length).toBe(0);
        });
        it('should not display Logout button if login has been cancelled', function () {
            component.hasUserLoggedOut = false;
            component.appInitError = AuthenticationError.USER_CANCELLED;
            fixture.detectChanges();
            var logoutButton = fixture.debugElement.queryAll(By.css('#logout-button'));
            expect(logoutButton.length).toBe(0);
        });
    });
});
//# sourceMappingURL=login.spec.js.map