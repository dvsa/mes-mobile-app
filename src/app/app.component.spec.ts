import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { App } from './app.component';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { MSAdal } from '@ionic-native/ms-adal';
import { MSAdalMock } from '../providers/authentication/__mocks__/ms-adal.mock';
import { AuthenticationProviderMock } from '../providers/authentication/__mocks__/authentication.mock';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { AppConfigProviderMock } from '../providers/app-config/__mocks__/app-config.mock';
import { StatusBarMock, SplashScreenMock, PlatformMock } from 'ionic-mocks-jest';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [App],
      providers: [
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
        { provide: SplashScreen, useFactory: () => SplashScreenMock.instance() },
        { provide: MSAdal, useClass: MSAdalMock },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the App component', () => {
    expect(component).toBeDefined();
  });
  it('should set the Journal Page as the route page if not ios', () => {
    expect(component.rootPage).toBe('JournalPage');
  });

  describe('login()', () => {
    it('should set rootPage to Journal if login succeeds', () => {
      component.login().then(() => {
        expect(component.rootPage).toBe('TestReportPage');
      });
    });;
    it('should set root page to Login Page if login fails', () => {
      component.login().catch(() => {
        expect(component.rootPage).toBe('LoginPage');
      });
    });
  });
});
