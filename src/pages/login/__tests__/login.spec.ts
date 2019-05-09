import { ComponentFixture, async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, LoadingController } from 'ionic-angular';
import {
  NavControllerMock,
  NavParamsMock,
  ConfigMock,
  PlatformMock,
  SplashScreenMock,
  LoadingControllerMock,
} from 'ionic-mocks';
import { Store , StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
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

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;
  let navController: NavController;
  let splashScreen: SplashScreen;
  let authenticationProvider: AuthenticationProvider;
  let appConfigProvider: AppConfigProvider;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: SplashScreen, useFactory: () => SplashScreenMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: DeviceProvider, useClass: DeviceProviderMock },
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
        { provide: SecureStorage, useClass: SecureStorageMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        splashScreen = TestBed.get(SplashScreen);
        authenticationProvider = TestBed.get(AuthenticationProvider);
        appConfigProvider = TestBed.get(AppConfigProvider);
      });
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should login successfully', fakeAsync(() => {
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
      expect(navController.setRoot).toHaveBeenCalledWith('JournalPage');
      expect(component.hasUserLoggedOut).toBeFalsy();
      expect(splashScreen.hide).toHaveBeenCalled();
    }));

    it('should fail to login gracefully', fakeAsync(() => {
      component.platform.ready =
        jasmine.createSpy('platform.ready').and.returnValue(Promise.resolve());
      authenticationProvider.login =
        jasmine.createSpy('authenticationProvider.login')
          .and.returnValue(Promise.reject(AuthenticationError.NO_INTERNET));
      component.handleLoadingUI =
        jasmine.createSpy('component.handleLoadingUI').and.callThrough();
      component.login();
      tick();
      expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
      expect(component.appInitError === AuthenticationError.NO_INTERNET);
      expect(component.hasUserLoggedOut).toBeFalsy();
      expect(splashScreen.hide).toHaveBeenCalled();
    }));

    it('should login successfully but display a message when the user is not authorised ', fakeAsync(() => {
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
      expect(component.hasUserLoggedOut).toBeFalsy();
      expect(component.appInitError === AuthenticationError.USER_NOT_AUTHORISED);
      expect(splashScreen.hide).toHaveBeenCalled();
    }));

    it('should return true for isInternetConnectError when criteria is met', () => {
      component.appInitError = AuthenticationError.NO_INTERNET;
      component.hasUserLoggedOut = false;

      expect(component.isInternetConnectionError()).toBeTruthy();
    });

    it('should return false for isInternetConnectError when criteria is not met', () => {
      component.appInitError = AuthenticationError.NO_INTERNET;
      component.hasUserLoggedOut = true;

      expect(component.isInternetConnectionError()).toBeFalsy();

      component.appInitError = undefined;
      component.hasUserLoggedOut = false;

      expect(component.isInternetConnectionError()).toBeFalsy();
    });

    it('should return true for isUserCancelledError when criteria is met', () => {
      component.appInitError = AuthenticationError.USER_CANCELLED;
      component.hasUserLoggedOut = false;

      expect(component.isUserCancelledError()).toBeTruthy();
    });

    it('should return false for isUserCancelledError when criteria is not met', () => {
      component.appInitError = AuthenticationError.USER_CANCELLED;
      component.hasUserLoggedOut = true;

      expect(component.isUserCancelledError()).toBeFalsy();

      component.appInitError = undefined;
      component.hasUserLoggedOut = false;

      expect(component.isUserCancelledError()).toBeFalsy();
    });

    it('should return true for isUnknownError when criteria is met', () => {
      component.appInitError = AuthenticationError.NO_RESPONSE;
      component.hasUserLoggedOut = false;

      expect(component.isUnknownError()).toBeTruthy();
    });

    it('should return false for isUnknownError when criteria is not met', () => {
      component.appInitError = AuthenticationError.USER_CANCELLED;
      component.hasUserLoggedOut = false;

      expect(component.isUnknownError()).toBeFalsy();

      component.appInitError = undefined;
      component.hasUserLoggedOut = true;

      expect(component.isUnknownError()).toBeFalsy();
    });

    it('should return true for isUserNotAuthorised when criteria is met', () => {
      component.appInitError = AuthenticationError.USER_NOT_AUTHORISED;
      component.hasUserLoggedOut = false;

      expect(component.isUserNotAuthorised()).toBeTruthy();
    });
  });

  describe('DOM', () => {
    it('should show the correct div if user has logged out', () => {
      component.hasUserLoggedOut = true;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags.length).toBe(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('signed out');
    });

    it('should show the correct div if user has an internet connection error', () => {
      component.hasUserLoggedOut = false;
      component.appInitError = AuthenticationError.NO_INTERNET;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags.length).toBe(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('offline');
    });

    it('should show the correct div if user has an user cancelled error', () => {
      component.hasUserLoggedOut = false;
      component.appInitError = AuthenticationError.USER_CANCELLED;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags.length).toBe(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('cancelled sign in');
    });

    it('should show the correct div if user has an internet connection error', () => {
      component.hasUserLoggedOut = false;
      component.appInitError = AuthenticationError.NO_RESPONSE;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags.length).toBe(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('Sorry, something went wrong');
    });

    it('should show the correct div if user is not authorised to use the app', () => {
      component.hasUserLoggedOut = false;
      component.appInitError = AuthenticationError.USER_NOT_AUTHORISED;
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('h2'));
      expect(tags.length).toBe(1);
      expect((tags[0].nativeElement as HTMLElement).textContent).toContain('not authorised to use this app');
    });

  });
});
