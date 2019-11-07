
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
import { ComponentsModule } from '../../../components/common/common-components.module';
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
import { WaitingRoomValidationError } from '../waiting-room.actions';
import { of } from 'rxjs/observable/of';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';
import * as communicationPreferenceActions
  from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../shared/mocks/insomnia.mock';
import { JournalData } from '@dvsa/mes-test-schema/categories/B';
import { App } from '../../../app/app.component';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';

fdescribe('WaitingRoomPage', () => {
  let fixture: ComponentFixture<WaitingRoomPage>;
  let component: WaitingRoomPage;
  let store$: Store<StoreModel>;
  let deviceProvider: DeviceProvider;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;

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
              communicationPreferences: {
                updatedEmaill: 'test@mail.com',
                communicationMethod: 'Email',
                conductedLanguage: 'Cymraeg',
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
        { provide: DeviceProvider, useClass: DeviceProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
        { provide: App, useClass: MockAppComponent },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WaitingRoomPage);
        component = fixture.componentInstance;
        deviceProvider = TestBed.get(DeviceProvider);
        screenOrientation = TestBed.get(ScreenOrientation);
        insomnia = TestBed.get(Insomnia);
        deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
        component.subscription = new Subscription();
      });
  }));

  describe('Class', () => {
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

    describe('Welsh text selected', () => {
      it('it should dispatch CandidateChoseToProceedWithTestInWelsh action', () => {
        component.dispatchCandidateChoseToProceedInWelsh();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseToProceedWithTestInWelsh(
            Language.CYMRAEG));
      });
    });

    describe('English text selected', () => {
      it('it should dispatch CandidateChoseToProceedWithTestInEnglish action', () => {
        component.dispatchCandidateChoseToProceedInEnglish();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseToProceedWithTestInEnglish(
            Language.ENGLISH));
      });
    });

    describe('ionViewDidEnter', () => {
      it('should enable single app mode if on ios and not in practice mode', () => {
        component.isPracticeMode = false;
        component.ionViewDidEnter();
        expect(deviceProvider.enableSingleAppMode).toHaveBeenCalled();
      });

      it('should note enable single app mode if on ios and in practice mode', () => {
        component.isPracticeMode = true;
        component.ionViewDidEnter();
        expect(deviceProvider.enableSingleAppMode).not.toHaveBeenCalled();
      });

      it('should lock the screen orientation to Portrait Primary', () => {
        component.ionViewDidEnter();
        expect(screenOrientation.lock)
          .toHaveBeenCalledWith(screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      });

      it('should keep the device awake', () => {
        component.ionViewDidEnter();
        expect(insomnia.keepAwake).toHaveBeenCalled();
      });

    });

    describe('isJournalDataInvalid', () => {
      const journalData: JournalData = {
        examiner: {
          staffNumber: 'real-staff-number',
        },
        testCentre: {
          centreId: 11223344,
          centreName: 'name',
          costCode: 'cost code',
        },
        testSlotAttributes: {
          slotId: 12123331,
          start: '2019-11-11',
          vehicleTypeCode: 'vehicl code',
          welshTest: true,
          specialNeeds: true,
          extendedTest: false,
        },
        candidate: {
          candidateName: {
            firstName: 'fname',
            secondName: 'sname',
          },
          driverNumber: 'real-driver-number',
        },
        applicationReference: {
          applicationId: 11223344141414,
          bookingSequence: 112,
          checkDigit: 11,
        },
      };

      it('should return ture if no examiner staffnumber', () => {
        const result = component.isJournalDataInvalid({
          ...journalData,
          examiner: {
            staffNumber: '',
          },
        });
        expect(result).toBeTruthy;
      });

      it('should return ture if no candidate name & driver number', () => {
        const result = component.isJournalDataInvalid({
          ...journalData,
          candidate: {
            candidateName: {},
            driverNumber: '',
          },
        });
        expect(result).toBeTruthy;
      });

      it('should return false if it has staff number and candidate name but no driver number', () => {
        const result = component.isJournalDataInvalid({
          ...journalData,
          candidate: {
            ...journalData.candidate,
            driverNumber: '',
          },
        });
        expect(result).toBeFalsy;
      });

      it('should return false if it has staff number and driver number but no candidate name', () => {
        const result = component.isJournalDataInvalid({
          ...journalData,
          candidate: {
            ...journalData.candidate,
            driverNumber: '',
          },
        });
        expect(result).toBeFalsy;
      });
    });
  });

  describe('clickBack', () => {
    it('should should trigger the lock screen', () => {
      component.clickBack();
      expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
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
      it('should call residency change handler when residency declaration is (un)checked', () => {
        fixture.detectChanges();
        spyOn(component, 'residencyDeclarationChanged');
        const residencyCb = fixture.debugElement.query(By.css('#residency-declaration-checkbox'));
        residencyCb.triggerEventHandler('click', null);
        expect(component.residencyDeclarationChanged).toHaveBeenCalled();
      });
      it('should call insurance change handler when insurance declaration is (un)checked', () => {
        fixture.detectChanges();
        spyOn(component, 'insuranceDeclarationChanged');
        const insuranceCb = fixture.debugElement.query(By.css('#insurance-declaration-checkbox'));
        insuranceCb.triggerEventHandler('click', null);
        expect(component.insuranceDeclarationChanged).toHaveBeenCalled();
      });
    });
  });
  describe('onSubmit', () => {
    it('should dispatch the WaitingRoomValidationError action', fakeAsync(() => {
      const form = component.form;
      form.get('insuranceCheckboxCtrl').setValue(false);
      form.get('residencyCheckboxCtrl').setValue(false);
      form.get('signatureAreaCtrl').setValue(null);
      component.onSubmit();
      tick();
      expect(store$.dispatch).toHaveBeenCalledWith(new WaitingRoomValidationError('insuranceCheckboxCtrl is blank'));
      expect(store$.dispatch).toHaveBeenCalledWith(new WaitingRoomValidationError('residencyCheckboxCtrl is blank'));
      expect(store$.dispatch).toHaveBeenCalledWith(new WaitingRoomValidationError('signatureAreaCtrl is blank'));
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

      expect(form.get('insuranceCheckboxCtrl').value).toEqual(true);
      expect(form.get('residencyCheckboxCtrl').value).toEqual(true);
      expect(form.get('signatureAreaCtrl').value).toEqual('abc123');
    });
  });
});
