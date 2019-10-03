import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommunicationCatBePage } from '../communication.cat-be.page';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { DeviceAuthenticationProvider } from '../../../../providers/device-authentication/device-authentication';
import { AppModule } from '../../../../app/app.module';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import {
  initialState as preTestDeclarationInitialState,
} from '../../../../modules/tests/pre-test-declarations/pre-test-declarations.reducer';
import {
  DeviceAuthenticationProviderMock,
} from '../../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { ProvidedEmailComponent } from '../../components/provided-email/provided-email';
import { NewEmailComponent } from '../../components/new-email/new-email';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import * as communicationPreferenceActions
  from '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { PostalAddressComponent } from '../../components/postal-address/postal-address';
import { MockComponent } from 'ng-mocks';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { TranslateService, TranslateModule } from 'ng2-translate';
import { PopulateTestSlotAttributes }
  from '../../../../modules/tests/test-slot-attributes/test-slot-attributes.actions';
import * as welshTranslations from '../../../../assets/i18n/cy.json';
import { PrivacyNoticeComponent } from '../../components/privacy-notice/privacy-notice';
import { CommunicationSubmitInfo } from '../../communication.actions';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';

describe('CommunicationCatBPage', () => {
  let fixture: ComponentFixture<CommunicationCatBePage>;
  let component: CommunicationCatBePage;
  let store$: Store<StoreModel>;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;
  let translate: TranslateService;

  const mockCandidate = {
    driverNumber: '123',
    candidateName: {
      firstName: 'Joe',
      lastName: 'Blogs',
    },
    emailAddress: 'testemail@mes',
    candidateAddress: null,
  };

  const testSlotAttributes: TestSlotAttributes = {
    welshTest: false,
    extendedTest: false,
    slotId: 123,
    specialNeeds: false,
    start: '',
    vehicleTypeCode: '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommunicationCatBePage,
        ProvidedEmailComponent,
        NewEmailComponent,
        MockComponent(PostalAddressComponent),
        MockComponent(PrivacyNoticeComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        StoreModule.forRoot({
          tests: () => ({
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
                  testSlotAttributes,
                  candidate: mockCandidate,
                },
                communicationPreferences: {
                  updatedEmail: '',
                  communicationMethod: 'Not provided',
                  conductedLanguage: 'Not provided',
                },
              },
            },
          }),
        }),
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
        fixture = TestBed.createComponent(CommunicationCatBePage);
        component = fixture.componentInstance;
        deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch').and.callThrough();
        component.subscription = new Subscription();
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
      });

  }));

  describe('Class', () => {
    describe('Changing preferred email', () => {
      it('should display the provided email input when selected', () => {
        fixture.whenStable().then(() => {
          const providedEmail = fixture.debugElement.query(By.css('#providedEmail'));
          providedEmail.triggerEventHandler('click', null);
          expect(fixture.debugElement.query(By.css('#providedEmailInput'))).toBeDefined();
        });
      });
      it('should display the new email input when selected', () => {
        const newEmail = fixture.debugElement.query(By.css('#newEmail'));
        newEmail.triggerEventHandler('click', null);
        expect(fixture.debugElement.query(By.css('#newEmailInput'))).toBeDefined();
      });
    });

    describe('Submit', () => {
      it('should dispatch the SubmitCommunicationInfo action', fakeAsync(() => {
        const form = component.form;
        form.get('radioCtrl').setValue(true);
        component.onSubmit();
        tick();
        expect(store$.dispatch).toHaveBeenCalledWith(new CommunicationSubmitInfo());
      }));
      it('form should only be valid whenever all form controls are initialised', () => {
        const form = component.form;
        form.get('radioCtrl').setValue(true);
        expect(form.get('radioCtrl').status).toEqual('VALID');
        expect(form.valid).toEqual(true);
      });
    });

    describe('Provided email selected', () => {
      it('should dispatch a CandidateChoseEmailAsCommunicationPreference action', () => {
        component.candidateProvidedEmail = mockCandidate.emailAddress;
        component.dispatchCandidateChoseProvidedEmail();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseEmailAsCommunicationPreference(
            mockCandidate.emailAddress, CommunicationCatBePage.email,
          ));
      });
    });

    describe('New email selected', () => {
      it('should dispatch a CandidateChoseEmailAsCommunicationPreference action', () => {
        component.dispatchCandidateChoseNewEmail(mockCandidate.emailAddress);
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseEmailAsCommunicationPreference(
            mockCandidate.emailAddress, CommunicationCatBePage.email,
          ));
      });
    });

    describe('Post selected', () => {
      it('should dispatch a CandidateChosePostAsCommunicationPreference action', () => {
        component.dispatchCandidateChosePost();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChosePostAsCommunicationPreference(
            CommunicationCatBePage.post,
          ));
      });
    });

    describe('Communication class level funcitons', () => {
      it('should set setCommunicationType', () => {
        component.setCommunicationType(CommunicationCatBePage.email, CommunicationCatBePage.providedEmail);
        expect(component.communicationType).toEqual(CommunicationCatBePage.email);
        expect(component.emailType).toEqual(CommunicationCatBePage.providedEmail);
      });

      it('should return true for isProvidedEmailSelected() if appropriate properties are defined', () => {
        component.communicationType = CommunicationCatBePage.email;
        component.emailType = CommunicationCatBePage.providedEmail;
        const returnValue = component.isProvidedEmailSelected();
        expect(returnValue).toBe(true);
      });

      it('should return false for isProvidedEmailSelected() if appropriate properties are not defined', () => {
        component.communicationType = 'Post';
        component.emailType = null;
        const returnValue = component.isProvidedEmailSelected();
        expect(returnValue).toBe(false);
      });

      it('should return true for isNewEmailSelected() if appropriate properties are defined', () => {
        component.communicationType = CommunicationCatBePage.email;
        component.emailType = CommunicationCatBePage.updatedEmail;
        const returnValue = component.isNewEmailSelected();
        expect(returnValue).toBe(true);
      });

      it('should return false for isNewEmailSelected() if appropriate properties are not defined', () => {
        component.communicationType = 'Post';
        component.emailType = null;
        const returnValue = component.isNewEmailSelected();
        expect(returnValue).toBe(false);
      });

      it('should return false for shouldPreselectADefaultValue() if communication type is defined', () => {
        component.communicationType = CommunicationCatBePage.email;
        const returnValue = component.shouldPreselectADefaultValue();
        expect(returnValue).toBe(false);
      });

      it('should return true for shouldPreselectADefaultValue() if communication type is \'Not provided\'', () => {
        component.communicationType = 'Not provided';
        const returnValue = component.shouldPreselectADefaultValue();
        expect(returnValue).toBe(true);
      });

      it('should return false for shouldPreselectADefaultValue() if communication type is null', () => {
        component.communicationType = null;
        const returnValue = component.shouldPreselectADefaultValue();
        expect(returnValue).toBe(false);
      });

    });
    describe('clickBack', () => {
      it('should not should trigger the lock screen', () => {
        component.clickBack();
        expect(deviceAuthenticationProvider.triggerLockScreen).not.toHaveBeenCalled();
      });
    });

  });

  describe('DOM', () => {
    describe('i18n', () => {
      it('should render the page in English by default', () => {
        fixture.detectChanges();
        const { debugElement } = fixture;
        expect(debugElement.query(By.css('h4')).nativeElement.innerHTML).toBe('Select how to receive the test results');
      });
      it('should render the page in Welsh for a Welsh test', (done) => {
        fixture.detectChanges();
        component.configureI18N(Language.CYMRAEG);
        translate.onLangChange.subscribe(() => {
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('h4')).nativeElement.innerHTML)
            .toBe((<any>welshTranslations).communication.instructionHeader);
          done();
        });
        store$.dispatch(new PopulateTestSlotAttributes({ ...testSlotAttributes, welshTest: true }));
      });
    });
  });

});
