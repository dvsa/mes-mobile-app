import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { App } from '../app.component';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../providers/app-config/__mocks__/app-config.mock';
import { StatusBarMock, PlatformMock } from 'ionic-mocks-jest';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let statusBar: StatusBar

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [App],
      providers: [
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: StatusBar, useFactory: () => StatusBarMock.instance() },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    statusBar = TestBed.get(StatusBar);
  });

  describe('Class', () => {

    it('should create the App component', () => {
      expect(component).toBeDefined();
    });

    it('should have the correct root page', () => {
      expect(component.rootPage).toBe('LoginPage');
    });

    it('should configure the status bar', () => {
      expect(statusBar.styleLightContent).toBeCalledTimes(1);
      expect(statusBar.overlaysWebView).toBeCalledTimes(1);
      expect(statusBar.overlaysWebView).toBeCalledWith(false);
      expect(statusBar.backgroundColorByHexString).toBeCalledTimes(1);
      expect(statusBar.backgroundColorByHexString).toBeCalledWith('#000000')
    });
  });

});
