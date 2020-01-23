
import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../../app/app.module';
import { WaitingRoomCatCPage } from '../waiting-room.cat-c.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import {
  ToggleResidencyDeclaration,
  ToggleInsuranceDeclaration,
} from '../../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import {
  initialState as preTestDeclarationInitialState,
} from '../../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import { DeviceAuthenticationProvider } from '../../../../providers/device-authentication/device-authentication';
import {
  DeviceAuthenticationProviderMock,
} from '../../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { WaitingRoomValidationError } from '../../waiting-room.actions';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';
import * as communicationPreferenceActions
  from '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { MockComponent } from 'ng-mocks';
import { ConductedLanguageComponent } from '../../components/conducted-language/conducted-language';
import { InsuranceDeclarationComponent } from '../../components/insurance-declaration/insurance-declaration';
import { ResidencyDeclarationComponent } from '../../components/residency-declaration/residency-declaration';
import { SignatureComponent } from '../../components/signature/signature';
import { EndTestLinkComponent } from '../../../../components/common/end-test-link/end-test-link';
import { LockScreenIndicator } from '../../../../components/common/screen-lock-indicator/lock-screen-indicator';
import { CandidateSectionComponent } from '../../../../components/common/candidate-section/candidate-section';
import { FormControl, Validators } from '@angular/forms';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { App } from '../../../../app/app.component';
import { MockAppComponent } from '../../../../app/__mocks__/app.component.mock';
import { configureTestSuite } from 'ng-bullet';

describe('WaitingRoomCatCPage', () => {
  let fixture: ComponentFixture<WaitingRoomCatCPage>;
  let component: WaitingRoomCatCPage;
  let store$: Store<StoreModel>;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let translate: TranslateService;
  let navController: NavController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        WaitingRoomCatCPage,
        MockComponent(EndTestLinkComponent),
        MockComponent(LockScreenIndicator),
        MockComponent(CandidateSectionComponent),
        MockComponent(ConductedLanguageComponent),
        MockComponent(InsuranceDeclarationComponent),
        MockComponent(ResidencyDeclarationComponent),
        MockComponent(SignatureComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        TranslateModule,
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
                candidate: candidateMock,
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
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
        { provide: App, useClass: MockAppComponent },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WaitingRoomCatCPage);
    component = fixture.componentInstance;
    screenOrientation = TestBed.get(ScreenOrientation);
    insomnia = TestBed.get(Insomnia);
    deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
    component.subscription = new Subscription();
    navController = TestBed.get(NavController);
  }));

  describe('Class', () => {
    describe('residencyDeclarationChanged', () => {
      it('should emit a residency declaration toggle action when changed', () => {
        component.residencyDeclarationChanged();

        expect(store$.dispatch).toHaveBeenCalledWith(new ToggleResidencyDeclaration());
      });
    });

    describe('insuranceDeclarationChanged', () => {
      it('should emit an insurance declaration toggle action when changed', () => {
        component.insuranceDeclarationChanged();

        expect(store$.dispatch).toHaveBeenCalledWith(new ToggleInsuranceDeclaration());
      });
    });

    describe('dispatchCandidateChoseToProceedInWelsh', () => {
      it('it should dispatch CandidateChoseToProceedWithTestInWelsh action', () => {
        component.dispatchCandidateChoseToProceedInWelsh();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseToProceedWithTestInWelsh(
            Language.CYMRAEG));
      });
    });

    describe('dispatchCandidateChoseToProceedInEnglish', () => {
      it('it should dispatch CandidateChoseToProceedWithTestInEnglish action', () => {
        component.dispatchCandidateChoseToProceedInEnglish();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseToProceedWithTestInEnglish(
            Language.ENGLISH));
      });
    });

    describe('ionViewDidEnter', () => {
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

    describe('clickBack', () => {
      it('should should trigger the lock screen', () => {
        component.clickBack();
        expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
      });
    });

    describe('onSubmit', () => {
      it('should navigate to the COMMUNICATION_PAGE if the form is valid', () => {
        const formGroup = component.formGroup;
        formGroup.addControl('insuranceCheckbox', new FormControl('', [Validators.requiredTrue]));
        formGroup.get('insuranceCheckbox').setValue(true);
        component.onSubmit();
        expect(navController.push).toHaveBeenCalled();
      });
      it('should dispatch the WaitingRoomValidationError action if a field is not valid', fakeAsync(() => {
        const formGroup = component.formGroup;
        formGroup.addControl('insuranceCheckbox', new FormControl('', [Validators.requiredTrue]));
        formGroup.get('insuranceCheckbox').setValue(false);
        component.onSubmit();
        tick();
        expect(store$.dispatch).toHaveBeenCalledWith(new WaitingRoomValidationError('insuranceCheckbox is blank'));
      }));
    });

    describe('isJournalDataInvalid', () => {
      const journalData: CatCUniqueTypes.JournalData = {
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
          vehicleTypeCode: 'vehicle type code',
          welshTest: true,
          specialNeeds: true,
          extendedTest: false,
        },
        candidate: {
          candidateName: {
            firstName: 'fname',
            lastName: 'lname',
          },
        } as CatCUniqueTypes.Candidate,
        applicationReference: {
          applicationId: 11223344141414,
          bookingSequence: 112,
          checkDigit: 11,
        },
      };

      it('should return true if no examiner staffnumber', () => {
        const result = component.isJournalDataInvalid({
          ...journalData,
          examiner: {
            staffNumber: '',
          },
        });
        expect(result).toBeTruthy;
      });

      it('should return true if no candidate name & driver number', () => {
        const result = component.isJournalDataInvalid({
          ...journalData,
          candidate: {
            candidateName: {},
            driverNumber: '',
          } as CatCUniqueTypes.Candidate,
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
});
