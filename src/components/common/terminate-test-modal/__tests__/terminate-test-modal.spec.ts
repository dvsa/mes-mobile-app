import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../../app/app.module';
import { TerminateTestModal } from '../terminate-test-modal';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { By } from '@angular/platform-browser';
import { DeviceAuthenticationProvider } from '../../../../providers/device-authentication/device-authentication';
// tslint:disable-next-line:max-line-length
import { DeviceAuthenticationProviderMock } from '../../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { configureTestSuite } from 'ng-bullet';

describe('TerminateTestModal', () => {
  let fixture: ComponentFixture<TerminateTestModal>;
  let component: TerminateTestModal;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [TerminateTestModal],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
        fixture = TestBed.createComponent(TerminateTestModal);
        component = fixture.componentInstance;
        deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
        component.onTerminate = jasmine.createSpy('onTerminate');
        component.onCancel = jasmine.createSpy('onCancel');
  }));

  describe('DOM', () => {
    it('should call the provided onCancel function when returning to the test', () => {
      const returnButton = fixture.debugElement.query(By.css('.return-button'));
      returnButton.triggerEventHandler('click', null);
      expect(component.onCancel).toHaveBeenCalled();
    });
    it('should call the provided onTerminate function when confirming test termination', () => {
      spyOn(component, 'terminationWrapper');
      const terminateButton = fixture.debugElement.query(By.css('.terminate-button'));
      terminateButton.triggerEventHandler('click', null);
      expect(component.terminationWrapper).toHaveBeenCalled();
    });
  });

  describe('Class', () => {
    describe('terminationWrapper', () => {
      it('should trigger the lock screen', () => {
        component.terminationWrapper();
        expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
      });
      it('should not call the onTerminate callback when the lock screen Promise rejects', async () => {
        const lockScreenRejectionSpy = jasmine.createSpy('triggerLockScreen').and.returnValue(Promise.reject('n'));
        deviceAuthenticationProvider.triggerLockScreen = lockScreenRejectionSpy;
        await component.terminationWrapper();
        expect(component.onTerminate).not.toHaveBeenCalled();
      });
      it('should call the onTerminate callback when the lock screen Promise resolves', async () => {
        const lockScreenRejectionSpy = jasmine.createSpy('triggerLockScreen').and.returnValue(Promise.resolve('y'));
        deviceAuthenticationProvider.triggerLockScreen = lockScreenRejectionSpy;
        await component.terminationWrapper();
        expect(component.onTerminate).toHaveBeenCalled();
      });
    });
  });
});
