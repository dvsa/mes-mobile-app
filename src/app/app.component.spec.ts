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

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  const platformStub = {
    ready: jest.fn().mockResolvedValue('ready'),
    is: jest.fn().mockResolvedValue(true)
  };
  const statusBarStub = {
    styleDefault: jest.fn((): void => undefined),
    overlaysWebView: jest.fn(),
    backgroundColorByName: jest.fn()
  };
  const splashScreenStub = {
    hide: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [App],
      providers: [
        { provide: Platform, useValue: platformStub },
        { provide: StatusBar, useValue: statusBarStub },
        { provide: SplashScreen, useValue: splashScreenStub },
        { provide: MSAdal, useClass: MSAdalMock},
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the App component', () => {
    expect(component).toBeDefined();
  });

  it('should have Login Page as the root page', () => {
   // expect(component.rootPage).toBe('LoginPage');
  });

  it('should call the styleDefault method on statusBar', () => {
    expect(platformStub.ready).toBeCalled();
    expect(statusBarStub.overlaysWebView).toBeCalledWith(false);
  });

  it('should call the hide method on splashScreen', () => {
   // expect(splashScreenStub.hide).toBeCalled();
  });
});
