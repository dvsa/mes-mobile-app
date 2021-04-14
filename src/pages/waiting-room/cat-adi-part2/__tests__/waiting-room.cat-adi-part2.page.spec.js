var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { WaitingRoomCatADIPart2Page } from '../waiting-room.cat-adi-part2.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { Store, StoreModule } from '@ngrx/store';
import { ToggleInsuranceDeclaration, } from '../../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import { initialState as preTestDeclarationInitialState, } from '../../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import { DeviceAuthenticationProvider } from '../../../../providers/device-authentication/device-authentication';
import { DeviceAuthenticationProviderMock, } from '../../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { WaitingRoomValidationError } from '../../waiting-room.actions';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import * as communicationPreferenceActions from '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { DeviceProvider } from '../../../../providers/device/device';
import { DeviceProviderMock } from '../../../../providers/device/__mocks__/device.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { MockComponent } from 'ng-mocks';
import { ConductedLanguageComponent } from '../../components/conducted-language/conducted-language';
import { InsuranceDeclarationComponent } from '../../components/insurance-declaration/insurance-declaration';
import { SignatureComponent } from '../../components/signature/signature';
import { EndTestLinkComponent } from '../../../../components/common/end-test-link/end-test-link';
import { LockScreenIndicator } from '../../../../components/common/screen-lock-indicator/lock-screen-indicator';
import { CandidateSectionComponent } from '../../../../components/common/candidate-section/candidate-section';
import { FormControl, Validators } from '@angular/forms';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { App } from '../../../../app/app.component';
import { MockAppComponent } from '../../../../app/__mocks__/app.component.mock';
import { configureTestSuite } from 'ng-bullet';
describe('WaitingRoomCatADIPart2Page', function () {
    var fixture;
    var component;
    var store$;
    var deviceProvider;
    var deviceAuthenticationProvider;
    var screenOrientation;
    var insomnia;
    var translate;
    var navController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                WaitingRoomCatADIPart2Page,
                MockComponent(EndTestLinkComponent),
                MockComponent(LockScreenIndicator),
                MockComponent(CandidateSectionComponent),
                MockComponent(ConductedLanguageComponent),
                MockComponent(InsuranceDeclarationComponent),
                MockComponent(SignatureComponent),
            ],
            imports: [
                IonicModule,
                AppModule,
                TranslateModule,
                StoreModule.forFeature('tests', function () { return ({
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
                }); }),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: DeviceProvider, useClass: DeviceProviderMock },
                { provide: ScreenOrientation, useClass: ScreenOrientationMock },
                { provide: Insomnia, useClass: InsomniaMock },
                { provide: App, useClass: MockAppComponent },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(WaitingRoomCatADIPart2Page);
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
        navController = TestBed.get(NavController);
    }));
    describe('Class', function () {
        describe('insuranceDeclarationChanged', function () {
            it('should emit an insurance declaration toggle action when changed', function () {
                component.insuranceDeclarationChanged();
                expect(store$.dispatch).toHaveBeenCalledWith(new ToggleInsuranceDeclaration());
            });
        });
        describe('dispatchCandidateChoseToProceedInWelsh', function () {
            it('it should dispatch CandidateChoseToProceedWithTestInWelsh action', function () {
                component.dispatchCandidateChoseToProceedInWelsh();
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseToProceedWithTestInWelsh(Language.CYMRAEG));
            });
        });
        describe('dispatchCandidateChoseToProceedInEnglish', function () {
            it('it should dispatch CandidateChoseToProceedWithTestInEnglish action', function () {
                component.dispatchCandidateChoseToProceedInEnglish();
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new communicationPreferenceActions.CandidateChoseToProceedWithTestInEnglish(Language.ENGLISH));
            });
        });
        describe('ionViewDidEnter', function () {
            it('should enable single app mode if on ios', function () {
                component.ionViewDidEnter();
                expect(deviceProvider.enableSingleAppMode).toHaveBeenCalled();
            });
            it('should lock the screen orientation to Portrait Primary', function () {
                component.ionViewDidEnter();
                expect(screenOrientation.lock)
                    .toHaveBeenCalledWith(screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
            });
            it('should keep the device awake', function () {
                component.ionViewDidEnter();
                expect(insomnia.keepAwake).toHaveBeenCalled();
            });
        });
        describe('clickBack', function () {
            it('should should trigger the lock screen', function () {
                component.clickBack();
                expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
            });
        });
        describe('onSubmit', function () {
            it('should navigate to the COMMUNICATION_PAGE if the form is valid', function () {
                var formGroup = component.formGroup;
                formGroup.addControl('insuranceCheckbox', new FormControl('', [Validators.requiredTrue]));
                formGroup.get('insuranceCheckbox').setValue(true);
                component.onSubmit();
                expect(navController.push).toHaveBeenCalled();
            });
            it('should dispatch the WaitingRoomValidationError action if a field is not valid', fakeAsync(function () {
                var formGroup = component.formGroup;
                formGroup.addControl('insuranceCheckbox', new FormControl('', [Validators.requiredTrue]));
                formGroup.get('insuranceCheckbox').setValue(false);
                component.onSubmit();
                tick();
                expect(store$.dispatch).toHaveBeenCalledWith(new WaitingRoomValidationError('insuranceCheckbox is blank'));
            }));
        });
        describe('isJournalDataInvalid', function () {
            var journalData = {
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
                    prn: 123321,
                    previousADITests: 1,
                },
                applicationReference: {
                    applicationId: 11223344141414,
                    bookingSequence: 112,
                    checkDigit: 11,
                },
            };
            it('should return true if no examiner staffnumber', function () {
                var result = component.isJournalDataInvalid(__assign(__assign({}, journalData), { examiner: {
                        staffNumber: '',
                    } }));
                expect(result).toBeTruthy;
            });
            it('should return true if no candidate name & driver number', function () {
                var result = component.isJournalDataInvalid(__assign(__assign({}, journalData), { candidate: {
                        candidateName: {},
                        driverNumber: '',
                    } }));
                expect(result).toBeTruthy;
            });
            it('should return false if it has staff number and candidate name but no driver number', function () {
                var result = component.isJournalDataInvalid(__assign(__assign({}, journalData), { candidate: __assign(__assign({}, journalData.candidate), { driverNumber: '' }) }));
                expect(result).toBeFalsy;
            });
            it('should return false if it has staff number and driver number but no candidate name', function () {
                var result = component.isJournalDataInvalid(__assign(__assign({}, journalData), { candidate: __assign(__assign({}, journalData.candidate), { driverNumber: '' }) }));
                expect(result).toBeFalsy;
            });
        });
    });
});
//# sourceMappingURL=waiting-room.cat-adi-part2.page.spec.js.map