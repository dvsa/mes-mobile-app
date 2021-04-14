import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { Store } from '@ngrx/store';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { MockComponent } from 'ng-mocks';
import { PassCertificateNumberComponent } from '../../components/pass-certificate-number/pass-certificate-number';
import { LicenseProvidedComponent } from '../../components/license-provided/license-provided';
import { D255Component } from '../../../../components/test-finalisation/d255/d255';
import { DebriefWitnessedComponent } from '../../../../components/test-finalisation/debrief-witnessed/debrief-witnessed';
import { LanguagePreferencesComponent } from '../../../../components/test-finalisation/language-preference/language-preferences';
import { FinalisationHeaderComponent } from '../../../../components/test-finalisation/finalisation-header/finalisation-header';
import { ProvisionalLicenseReceived, ProvisionalLicenseNotReceived, PassCertificateNumberChanged } from '../../../../modules/tests/pass-completion/pass-completion.actions';
import { PassFinalisationViewDidEnter, PassFinalisationValidationError, } from '../../pass-finalisation.actions';
import { GearboxCategoryChanged } from '../../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { D255Yes, D255No, DebriefWitnessed, DebriefUnwitnessed } from '../../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish } from '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { PassFinalisationCatDPage } from '../pass-finalisation.cat-d.page';
import { WarningBannerComponent } from '../../../../components/common/warning-banner/warning-banner';
import { TransmissionComponent } from '../../../../components/common/transmission/transmission';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PASS_CERTIFICATE_NUMBER_CTRL } from '../../components/pass-certificate-number/pass-certificate-number.constants';
import { Code78Component } from '../../components/code-78/code-78';
import { TransmissionType } from '../../../../shared/models/transmission-type';
import { configureTestSuite } from 'ng-bullet';
import { LicenceProvidedWarningBannerComponent } from '../../components/licence-provided-warning-banner/licence-provided-warning-banner';
describe('PassFinalisationCatDPage', function () {
    var fixture;
    var component;
    var store$;
    var categoryDifferences = [
        { category: "D" /* D */, showCode78: true },
        { category: "D1" /* D1 */, showCode78: false },
        { category: "D1+E" /* D1E */, showCode78: false },
        { category: "D+E" /* DE */, showCode78: true },
    ];
    var automaticManualBannerConditions = [
        { category: "D" /* D */,
            code78: true,
            transmission: TransmissionType.Automatic,
            automaticBanner: true,
            manualBanner: false,
            desc: 'Automatic banner shown when automatic transmission and code78 present',
        },
        {
            category: "D" /* D */,
            code78: false,
            transmission: TransmissionType.Automatic,
            automaticBanner: false,
            manualBanner: true,
            desc: 'Manual banner shown when automatic transmission and no code78 present',
        },
        {
            category: "D" /* D */,
            code78: false,
            transmission: TransmissionType.Manual,
            automaticBanner: false,
            manualBanner: true,
            desc: 'Manual banner shown when manual transmission and no code78 present',
        },
        {
            category: "D" /* D */,
            code78: true,
            transmission: TransmissionType.Manual,
            automaticBanner: false,
            manualBanner: true,
            desc: 'Manual banner shown when manual transmission and code78 present',
        },
        {
            category: "D+E" /* DE */,
            code78: true,
            transmission: TransmissionType.Automatic,
            automaticBanner: true,
            manualBanner: false,
            desc: 'Automatic banner shown when automatic transmission and code78 present',
        },
        {
            category: "D+E" /* DE */,
            code78: false,
            transmission: TransmissionType.Automatic,
            automaticBanner: false,
            manualBanner: true,
            desc: 'Manual banner shown when automatic transmission and no code78 present',
        },
        {
            category: "D+E" /* DE */,
            code78: false,
            transmission: TransmissionType.Manual,
            automaticBanner: false,
            manualBanner: true,
            desc: 'Manual banner shown when manual transmission and no code78 present',
        },
        {
            category: "D+E" /* DE */,
            code78: true,
            transmission: TransmissionType.Manual,
            automaticBanner: false,
            manualBanner: true,
            desc: 'Manual banner shown when manual transmission and code78 present',
        },
        {
            category: "D1" /* D1 */,
            code78: true,
            transmission: TransmissionType.Automatic,
            automaticBanner: false,
            manualBanner: false,
            desc: 'No banner shown when automatic transmission and code78 present',
        },
        {
            category: "D1" /* D1 */,
            code78: false,
            transmission: TransmissionType.Automatic,
            automaticBanner: false,
            manualBanner: false,
            desc: 'No banner shown when automatic transmission and no code78 present',
        },
        {
            category: "D1" /* D1 */,
            code78: false,
            transmission: TransmissionType.Manual,
            automaticBanner: false,
            manualBanner: false,
            desc: 'No banner shown when manual transmission and no code78 present',
        },
        {
            category: "D1" /* D1 */,
            code78: true,
            transmission: TransmissionType.Manual,
            automaticBanner: false,
            manualBanner: false,
            desc: 'No banner shown when manual transmission and code78 present',
        },
        {
            category: "D1+E" /* D1E */,
            code78: true,
            transmission: TransmissionType.Automatic,
            automaticBanner: false,
            manualBanner: false,
            desc: 'No banner shown when automatic transmission and code78 present',
        },
        {
            category: "D1+E" /* D1E */,
            code78: false,
            transmission: TransmissionType.Automatic,
            automaticBanner: false,
            manualBanner: false,
            desc: 'No banner shown when automatic transmission and no code78 present',
        },
        {
            category: "D1+E" /* D1E */,
            code78: false,
            transmission: TransmissionType.Manual,
            automaticBanner: false,
            manualBanner: false,
            desc: 'No banner shown when manual transmission and no code78 present',
        },
        {
            category: "D1+E" /* D1E */,
            code78: true,
            transmission: TransmissionType.Manual,
            automaticBanner: false,
            manualBanner: false,
            desc: 'No banner shown when manual transmission and code78 present',
        },
    ];
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PassFinalisationCatDPage,
                MockComponent(PassCertificateNumberComponent),
                MockComponent(LicenseProvidedComponent),
                MockComponent(TransmissionComponent),
                MockComponent(D255Component),
                MockComponent(DebriefWitnessedComponent),
                MockComponent(FinalisationHeaderComponent),
                MockComponent(LanguagePreferencesComponent),
                MockComponent(WarningBannerComponent),
                MockComponent(Code78Component),
                MockComponent(LicenceProvidedWarningBannerComponent),
            ],
            imports: [IonicModule, AppModule],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PassFinalisationCatDPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        describe('ionViewDidEnter', function () {
            it('should dispatch the VIEW_DID_ENTER action when the function is run', function () {
                component.ionViewDidEnter();
                expect(store$.dispatch).toHaveBeenCalledWith(new PassFinalisationViewDidEnter());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('provisionalLicenseReceived', function () {
            it('should dispatch the correct action when called', function () {
                component.provisionalLicenseReceived();
                expect(store$.dispatch).toHaveBeenCalledWith(new ProvisionalLicenseReceived());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('provisionalLicenseNotReceived', function () {
            it('should dispatch the correct action when called', function () {
                component.provisionalLicenseNotReceived();
                expect(store$.dispatch).toHaveBeenCalledWith(new ProvisionalLicenseNotReceived());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('transmissionChanged', function () {
            it('should dispatch the correct action when called', function () {
                component.transmissionChanged('Manual');
                expect(store$.dispatch).toHaveBeenCalledWith(new GearboxCategoryChanged('Manual'));
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('passCertificateNumberChanged', function () {
            it('should dispatch the correct action when called', function () {
                component.passCertificateNumberChanged('1e3f5y64');
                expect(store$.dispatch).toHaveBeenCalledWith(new PassCertificateNumberChanged('1e3f5y64'));
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('d255Changed', function () {
            it('should dispatch the correct action if the inputted value is true', function () {
                component.d255Changed(true);
                expect(store$.dispatch).toHaveBeenCalledWith(new D255Yes());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
            it('should dispatch the correct action if the inputted value is false', function () {
                component.d255Changed(false);
                expect(store$.dispatch).toHaveBeenCalledWith(new D255No());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('debriefWitnessedChanged', function () {
            it('should dispatch the correct action if the inputted value is true', function () {
                component.debriefWitnessedChanged(true);
                expect(store$.dispatch).toHaveBeenCalledWith(new DebriefWitnessed());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
            it('should dispatch the correct action if the inputted value is false', function () {
                component.debriefWitnessedChanged(false);
                expect(store$.dispatch).toHaveBeenCalledWith(new DebriefUnwitnessed());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('isWelshChanged', function () {
            it('should dispatch the correct action if the isWelsh flag is true', function () {
                component.isWelshChanged(true);
                expect(store$.dispatch).toHaveBeenCalledWith(new CandidateChoseToProceedWithTestInWelsh('Cymraeg'));
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
            it('should dispatch the correct action if the isWelsh flag is false', function () {
                component.isWelshChanged(false);
                expect(store$.dispatch).toHaveBeenCalledWith(new CandidateChoseToProceedWithTestInEnglish('English'));
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('onSubmit', function () {
            // Unit tests for the components TypeScript class
            it('should dispatch the PersistTests action', function () {
                component.onSubmit();
                expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
            });
            it('should dispatch the appropriate ValidationError actions', fakeAsync(function () {
                var _a;
                component.form = new FormGroup((_a = {
                        requiredControl1: new FormControl(null, [Validators.required]),
                        requiredControl2: new FormControl(null, [Validators.required])
                    },
                    _a[PASS_CERTIFICATE_NUMBER_CTRL] = new FormControl(null, [Validators.required]),
                    _a.notRequiredControl = new FormControl(null),
                    _a));
                component.onSubmit();
                tick();
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new PassFinalisationValidationError('requiredControl1 is blank'));
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new PassFinalisationValidationError('requiredControl2 is blank'));
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new PassFinalisationValidationError(PASS_CERTIFICATE_NUMBER_CTRL + " is invalid"));
                expect(store$.dispatch)
                    .not
                    .toHaveBeenCalledWith(new PassFinalisationValidationError('notRequiredControl is blank'));
            }));
        });
        automaticManualBannerConditions.forEach(function (cat) {
            it(cat.desc + " (" + cat.category + ")", function () {
                component.transmission = cat.transmission;
                component.code78Present = cat.code78;
                component.testCategory = cat.category;
                expect(component.shouldShowAutomaticBanner()).toEqual(cat.automaticBanner);
                expect(component.shouldShowManualBanner()).toEqual(cat.manualBanner);
            });
        });
        describe('shouldHideBanner', function () {
            it('should hide banner when only transmission is selected', function () {
                component.transmission = TransmissionType.Manual;
                expect(component.shouldShowCode78Banner()).toEqual(false);
            });
        });
        categoryDifferences.forEach(function (cat) {
            it("shouldShowCode78 for Cat " + cat.category, function () {
                component.testCategory = cat.category;
                expect(component.shouldShowCode78()).toEqual(cat.showCode78);
            });
        });
    });
});
//# sourceMappingURL=pass-finalisation.cat-d.page.spec.js.map