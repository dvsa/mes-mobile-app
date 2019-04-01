import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { HealthDeclarationPage } from '../health-declaration';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { ComponentsModule } from './../../../components/components.module';
import { DeviceProvider } from '../../../providers/device/device';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { HealthDeclarationViewDidEnter } from '../health-declaration.actions';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import {
  DeviceAuthenticationProviderMock,
} from '../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import * as postTestDeclarationsActions
  from '../../../modules/tests/post-test-declarations/post-test-declarations.actions';

describe('HealthDeclarationPage', () => {
  let fixture: ComponentFixture<HealthDeclarationPage>;
  let component: HealthDeclarationPage;
  let deviceProvider: DeviceProvider;
  let store$: Store<StoreModel>;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HealthDeclarationPage],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: DeviceProvider, useClass: DeviceProviderMock },
        { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HealthDeclarationPage);
        component = fixture.componentInstance;
      });

    deviceProvider = TestBed.get(DeviceProvider);
    deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('ionViewDidEnter', () => {
    it('should enable single app mode if on ios', () => {
      component.ionViewDidEnter();
      expect(deviceProvider.enableSingleAppMode).toHaveBeenCalled();
    });
    it('should dispatch HealthDeclarationViewDidEnter', () => {
      component.ionViewDidEnter();
      expect(store$.dispatch).toHaveBeenCalledWith(new HealthDeclarationViewDidEnter());
    });
    describe('ionViewDidLeave', () => {
      it('should disable single app mode if on ios', () => {
        component.ionViewDidLeave();
        expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
      });
    });
    describe('clickBack', () => {
      it('should should trigger the lock screen', () => {
        component.clickBack();
        expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
      });
    });
    describe('Declaration Validation', () => {
      it('form should only be valid when all fields are set', () => {
        const form = component.form;
        form.get('healthCheckboxCtrl').setValue(true);
        expect(form.get('healthCheckboxCtrl').status).toEqual('VALID');
        form.get('receiptCheckboxCtrl').setValue(true);
        expect(form.get('receiptCheckboxCtrl').status).toEqual('VALID');
        expect(form.valid).toEqual(false);
        form.get('signatureAreaCtrl').setValue('any date you like.');
        expect(form.get('signatureAreaCtrl').status).toEqual('VALID');
        expect(form.valid).toEqual(true);
      });
    });
    describe('healthDeclarationChanged', () => {
      it('should dispatch a ToggleHealthDeclaration action', () => {
        component.healthDeclarationChanged();
        expect(store$.dispatch).toHaveBeenCalledWith(new postTestDeclarationsActions.ToggleHealthDeclaration());
      });
    });
    describe('receiptDeclarationChanged', () => {
      it('should dispatch a ToggleReceiptDeclaration action', () => {
        component.receiptDeclarationChanged();
        expect(store$.dispatch).toHaveBeenCalledWith(new postTestDeclarationsActions.ToggleReceiptDeclaration());
      });
    });
  });
});
