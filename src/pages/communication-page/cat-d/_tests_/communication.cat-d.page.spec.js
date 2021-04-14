import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommunicationCatDPage } from '../communication.cat-d.page';
import { Store, StoreModule } from '@ngrx/store';
import { DeviceAuthenticationProvider } from '../../../../providers/device-authentication/device-authentication';
import { AppModule } from '../../../../app/app.module';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { initialState as preTestDeclarationInitialState, } from '../../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import { DeviceAuthenticationProviderMock, } from '../../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { ProvidedEmailComponent } from '../../components/provided-email/provided-email';
import { NewEmailComponent } from '../../components/new-email/new-email';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import * as communicationPreferenceActions from '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { PostalAddressComponent } from '../../components/postal-address/postal-address';
import { MockComponent } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as welshTranslations from '../../../../assets/i18n/cy.json';
import { PrivacyNoticeComponent } from '../../components/privacy-notice/privacy-notice';
import { CommunicationSubmitInfo } from '../../communication.actions';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { configureI18N } from '../../../../shared/helpers/translation.helpers';
import { configureTestSuite } from 'ng-bullet';
describe('CommunicationCatDPage', function () {
    var fixture;
    var component;
    var store$;
    var deviceAuthenticationProvider;
    var translate;
    var testSlotAttributes = {
        welshTest: false,
        extendedTest: false,
        slotId: 123,
        specialNeeds: false,
        start: '',
        vehicleTypeCode: '',
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                CommunicationCatDPage,
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
                    tests: function () { return ({
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
                                    testSlotAttributes: testSlotAttributes,
                                    candidate: candidateMock,
                                },
                                communicationPreferences: {
                                    updatedEmail: '',
                                    communicationMethod: 'Not provided',
                                    conductedLanguage: 'Not provided',
                                },
                            },
                        },
                    }); },
                }),
                TranslateModule,
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CommunicationCatDPage);
        component = fixture.componentInstance;
        deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch').and.callThrough();
        component.subscription = new Subscription();
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('Class', function () {
        describe('Changing preferred email', function () {
            it('should display the provided email input when selected', function () {
                fixture.whenStable().then(function () {
                    var providedEmail = fixture.debugElement.query(By.css('#providedEmail'));
                    providedEmail.triggerEventHandler('click', null);
                    expect(fixture.debugElement.query(By.css('#providedEmailInput'))).toBeDefined();
                });
            });
            it('should display the new email input when selected', function () {
                var newEmail = fixture.debugElement.query(By.css('#newEmail'));
                newEmail.triggerEventHandler('click', null);
                expect(fixture.debugElement.query(By.css('#newEmailInput'))).toBeDefined();
            });
        });
        describe('Submit', function () {
            it('should dispatch the SubmitCommunicationInfo action', fakeAsync(function () {
                var form = component.form;
                form.get('radioCtrl').setValue(true);
                component.onSubmit();
                tick();
                expect(store$.dispatch).toHaveBeenCalledWith(new CommunicationSubmitInfo());
            }));
            it('form should only be valid whenever all form controls are initialised', function () {
                var form = component.form;
                form.get('radioCtrl').setValue(true);
                expect(form.get('radioCtrl').status).toEqual('VALID');
                expect(form.valid).toEqual(true);
            });
        });
        describe('Provided email selected', function () {
            it('should dispatch a CandidateChoseEmailAsCommunicationPreference action', function () {
                component.candidateProvidedEmail = candidateMock.emailAddress;
                component.dispatchCandidateChoseProvidedEmail();
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseEmailAsCommunicationPreference(candidateMock.emailAddress, CommunicationCatDPage.email));
            });
        });
        describe('New email selected', function () {
            it('should dispatch a CandidateChoseEmailAsCommunicationPreference action', function () {
                component.dispatchCandidateChoseNewEmail(candidateMock.emailAddress);
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseEmailAsCommunicationPreference(candidateMock.emailAddress, CommunicationCatDPage.email));
            });
        });
        describe('Post selected', function () {
            it('should dispatch a CandidateChosePostAsCommunicationPreference action', function () {
                component.dispatchCandidateChosePost();
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChosePostAsCommunicationPreference(CommunicationCatDPage.post));
            });
        });
        describe('Communication class level funcitons', function () {
            it('should set setCommunicationType', function () {
                component.setCommunicationType(CommunicationCatDPage.email, CommunicationCatDPage.providedEmail);
                expect(component.communicationType).toEqual(CommunicationCatDPage.email);
                expect(component.emailType).toEqual(CommunicationCatDPage.providedEmail);
            });
            it('should return true for isProvidedEmailSelected() if appropriate properties are defined', function () {
                component.communicationType = CommunicationCatDPage.email;
                component.emailType = CommunicationCatDPage.providedEmail;
                var returnValue = component.isProvidedEmailSelected();
                expect(returnValue).toBe(true);
            });
            it('should return false for isProvidedEmailSelected() if appropriate properties are not defined', function () {
                component.communicationType = 'Post';
                component.emailType = null;
                var returnValue = component.isProvidedEmailSelected();
                expect(returnValue).toBe(false);
            });
            it('should return true for isNewEmailSelected() if appropriate properties are defined', function () {
                component.communicationType = CommunicationCatDPage.email;
                component.emailType = CommunicationCatDPage.updatedEmail;
                var returnValue = component.isNewEmailSelected();
                expect(returnValue).toBe(true);
            });
            it('should return false for isNewEmailSelected() if appropriate properties are not defined', function () {
                component.communicationType = 'Post';
                component.emailType = null;
                var returnValue = component.isNewEmailSelected();
                expect(returnValue).toBe(false);
            });
            it('should return false for shouldPreselectADefaultValue() if communication type is defined', function () {
                component.communicationType = CommunicationCatDPage.email;
                var returnValue = component.shouldPreselectADefaultValue();
                expect(returnValue).toBe(false);
            });
            it('should return true for shouldPreselectADefaultValue() if communication type is \'Not provided\'', function () {
                component.communicationType = 'Not provided';
                var returnValue = component.shouldPreselectADefaultValue();
                expect(returnValue).toBe(true);
            });
            it('should return false for shouldPreselectADefaultValue() if communication type is null', function () {
                component.communicationType = null;
                var returnValue = component.shouldPreselectADefaultValue();
                expect(returnValue).toBe(false);
            });
        });
        describe('clickBack', function () {
            it('should not should trigger the lock screen', function () {
                component.clickBack();
                expect(deviceAuthenticationProvider.triggerLockScreen).not.toHaveBeenCalled();
            });
        });
    });
    describe('DOM', function () {
        describe('i18n', function () {
            it('should render the page in English by default', function () {
                fixture.detectChanges();
                var debugElement = fixture.debugElement;
                expect(debugElement.query(By.css('h4')).nativeElement.innerHTML).toBe('Select how to receive the test results');
            });
            it('should render the page in Welsh for a Welsh test', function (done) {
                configureI18N(Language.CYMRAEG, translate);
                fixture.detectChanges();
                translate.onLangChange.subscribe(function () {
                    fixture.detectChanges();
                    expect(fixture.debugElement.query(By.css('h4')).nativeElement.innerHTML)
                        .toBe(welshTranslations.communication.instructionHeader);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=communication.cat-d.page.spec.js.map