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
import { DebriefWitnessedComponent } from '../../../../components/test-finalisation/debrief-witnessed/debrief-witnessed';
import { LanguagePreferencesComponent } from '../../../../components/test-finalisation/language-preference/language-preferences';
import { FinalisationHeaderComponent } from '../../../../components/test-finalisation/finalisation-header/finalisation-header';
import { PassCertificateNumberChanged, } from '../../../../modules/tests/pass-completion/pass-completion.actions';
import { PassFinalisationViewDidEnter, PassFinalisationValidationError, } from '../../pass-finalisation.actions';
import { DebriefWitnessed, DebriefUnwitnessed, } from '../../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish, } from '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { PassFinalisationCatCPCPage } from '../pass-finalisation.cat-cpc.page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PASS_CERTIFICATE_NUMBER_CTRL, } from '../../components/pass-certificate-number/pass-certificate-number.constants';
import { configureTestSuite } from 'ng-bullet';
describe('PassFinalisationCatCPCPage', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PassFinalisationCatCPCPage,
                MockComponent(PassCertificateNumberComponent),
                MockComponent(DebriefWitnessedComponent),
                MockComponent(FinalisationHeaderComponent),
                MockComponent(LanguagePreferencesComponent),
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
        fixture = TestBed.createComponent(PassFinalisationCatCPCPage);
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
        describe('passCertificateNumberChanged', function () {
            it('should dispatch the correct action when called', function () {
                component.passCertificateNumberChanged('1e3f5y64');
                expect(store$.dispatch).toHaveBeenCalledWith(new PassCertificateNumberChanged('1e3f5y64'));
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
    });
});
//# sourceMappingURL=pass-finalisation.cat-cpc.page.spec.js.map