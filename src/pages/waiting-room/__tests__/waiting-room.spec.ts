
import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { WaitingRoomPage } from '../waiting-room';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from './../../../components/components.module';
import {
  ToggleResidencyDeclaration,
  ToggleInsuranceDeclaration,
} from '../../../modules/tests/pre-test-declarations/pre-test-declarations.actions';
import {
  initialState as preTestDeclarationInitialState,
} from '../../../modules/tests/pre-test-declarations/pre-test-declarations.reducer';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import {
  DeviceAuthenticationProviderMock,
} from '../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { SubmitWaitingRoomInfo } from '../waiting-room.actions';
import { of } from 'rxjs/observable/of';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';

describe('WaitingRoomPage', () => {
  let fixture: ComponentFixture<WaitingRoomPage>;
  let component: WaitingRoomPage;
  let store$: Store<StoreModel>;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;
  let translate: TranslateService;

  const mockCandidate = {
    driverNumber: '123',
    candidateName: {
      firstName: 'Joe',
      lastName: 'Bloggs',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaitingRoomPage,
      ],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        StoreModule.forFeature('tests', () => ({
          currentTest: {
            slotId: '123',
          },
          testStatus: {},
          startedTests: {
            123: {
              preTestDeclarations: preTestDeclarationInitialState,
              postTestDeclarations: {
                healthDeclarationAccepted: false,
                passCertificateNumberReceived: false,
                postTestSignature: '',
              },
              journalData: {
                candidate: mockCandidate,
                testSlotAttributes: {
                  welshTest: false,
                },
              },
            },
          },
        })),
        TranslateModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WaitingRoomPage);
        component = fixture.componentInstance;
        deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
        component.subscription = new Subscription();
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('declaration status', () => {
      it('should emit a residency declaration toggle action when changed', () => {
        component.residencyDeclarationChanged();

        expect(store$.dispatch).toHaveBeenCalledWith(new ToggleResidencyDeclaration());
      });
      it('should emit an insurance declaration toggle action when changed', () => {
        component.insuranceDeclarationChanged();

        expect(store$.dispatch).toHaveBeenCalledWith(new ToggleInsuranceDeclaration());
      });
    });
  });

  describe('clickBack', () => {
    it('should should not trigger the lock screen', () => {
      component.clickBack();
      expect(deviceAuthenticationProvider.triggerLockScreen).not.toHaveBeenCalled();
    });

    describe('Declaration Validation', () => {
      it('form should only be valid when all fields are set', () => {
        const form = component.form;
        form.get('insuranceCheckboxCtrl').setValue(true);
        expect(form.get('insuranceCheckboxCtrl').status).toEqual('VALID');
        form.get('residencyCheckboxCtrl').setValue(true);
        expect(form.get('residencyCheckboxCtrl').status).toEqual('VALID');
        expect(form.valid).toEqual(false);
        form.get('signatureAreaCtrl').setValue('any date you like.');
        expect(form.get('signatureAreaCtrl').status).toEqual('VALID');
        expect(form.valid).toEqual(true);
      });
    });
  });

  describe('DOM', () => {
    describe('Declaration checkboxes', () => {
      it('should call residency change handler when residency declaration is (un)checked', fakeAsync(() => {
        fixture.detectChanges();
        spyOn(component, 'residencyDeclarationChanged');
        const residencyCb = fixture.debugElement.query(By.css('#residency-declaration-checkbox'));
        residencyCb.triggerEventHandler('click', null);
        tick();
        fixture.detectChanges();
        expect(component.residencyDeclarationChanged).toHaveBeenCalled();
      }));
      it('should call insurance change handler when insurance declaration is (un)checked', fakeAsync(() => {
        fixture.detectChanges();
        spyOn(component, 'insuranceDeclarationChanged');
        const insuranceCb = fixture.debugElement.query(By.css('#insurance-declaration-checkbox'));
        insuranceCb.triggerEventHandler('click', null);
        tick();
        fixture.detectChanges();
        expect(component.insuranceDeclarationChanged).toHaveBeenCalled();
      }));
    });
  });
  describe('onSubmit', () => {
    it('should dispatch the SubmitWaitingRoomInfo action', fakeAsync(() => {
      const form = component.form;
      form.get('insuranceCheckboxCtrl').setValue(true);
      form.get('residencyCheckboxCtrl').setValue(true);
      form.get('signatureAreaCtrl').setValue('sig');
      component.onSubmit();
      tick();
      expect(store$.dispatch).toHaveBeenCalledWith(new SubmitWaitingRoomInfo());
    }));
  });
  describe('rehydrateFields', () => {
    it('should set the field values from the page state', () => {
      const form = component.form;

      form.get('insuranceCheckboxCtrl').setValue(null);
      form.get('residencyCheckboxCtrl').setValue(null);
      form.get('signatureAreaCtrl').setValue(null);

      fixture.detectChanges();

      component.pageState.insuranceDeclarationAccepted$ = of(true);
      component.pageState.residencyDeclarationAccepted$ = of(true);
      component.pageState.signature$ = of('abc123');

      component.rehydrateFields();
      fixture.detectChanges();

      expect(form.get('insuranceCheckboxCtrl').value).toBeTruthy();
      expect(form.get('residencyCheckboxCtrl').value).toBeTruthy();
      expect(form.get('signatureAreaCtrl').value).toEqual('abc123');
    });
  });
});
