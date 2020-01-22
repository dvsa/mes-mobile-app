import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommunicationCatBPage } from '../communication.cat-b.page';
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
} from '../../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
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
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/common';
import { TranslateService, TranslateModule } from 'ng2-translate';
import * as welshTranslations from '../../../../assets/i18n/cy.json';
import { PrivacyNoticeComponent } from '../../components/privacy-notice/privacy-notice';
import { CommunicationSubmitInfo } from '../../communication.actions';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { configureI18N } from '../../../../shared/helpers/translation.helpers';
import { configureTestSuite } from 'ng-bullet';

describe('CommunicationCatBPage', () => {
  let fixture: ComponentFixture<CommunicationCatBPage>;
  let component: CommunicationCatBPage;
  let store$: Store<StoreModel>;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;
  let translate: TranslateService;

  const testSlotAttributes: TestSlotAttributes = {
    welshTest: false,
    extendedTest: false,
    slotId: 123,
    specialNeeds: false,
    start: '',
    vehicleTypeCode: '',
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommunicationCatBPage,
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
                  candidate: candidateMock,
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
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommunicationCatBPage);
    component = fixture.componentInstance;
    deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch').and.callThrough();
    component.subscription = new Subscription();
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
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
        component.candidateProvidedEmail = candidateMock.emailAddress;
        component.dispatchCandidateChoseProvidedEmail();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseEmailAsCommunicationPreference(
            candidateMock.emailAddress, CommunicationCatBPage.email,
          ));
      });
    });

    describe('New email selected', () => {
      it('should dispatch a CandidateChoseEmailAsCommunicationPreference action', () => {
        component.dispatchCandidateChoseNewEmail(candidateMock.emailAddress);
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseEmailAsCommunicationPreference(
            candidateMock.emailAddress, CommunicationCatBPage.email,
          ));
      });
    });

    describe('Post selected', () => {
      it('should dispatch a CandidateChosePostAsCommunicationPreference action', () => {
        component.dispatchCandidateChosePost();
        expect(store$.dispatch)
          .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChosePostAsCommunicationPreference(
            CommunicationCatBPage.post,
          ));
      });
    });

    describe('Communication class level funcitons', () => {
      it('should set setCommunicationType', () => {
        component.setCommunicationType(CommunicationCatBPage.email, CommunicationCatBPage.providedEmail);
        expect(component.communicationType).toEqual(CommunicationCatBPage.email);
        expect(component.emailType).toEqual(CommunicationCatBPage.providedEmail);
      });

      it('should return true for isProvidedEmailSelected() if appropriate properties are defined', () => {
        component.communicationType = CommunicationCatBPage.email;
        component.emailType = CommunicationCatBPage.providedEmail;
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
        component.communicationType = CommunicationCatBPage.email;
        component.emailType = CommunicationCatBPage.updatedEmail;
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
        component.communicationType = CommunicationCatBPage.email;
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
        configureI18N(Language.CYMRAEG, translate);
        fixture.detectChanges();
        translate.onLangChange.subscribe(() => {
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('h4')).nativeElement.innerHTML)
            .toBe((<any>welshTranslations).communication.instructionHeader);
          done();
        });
      });
    });
  });

});
