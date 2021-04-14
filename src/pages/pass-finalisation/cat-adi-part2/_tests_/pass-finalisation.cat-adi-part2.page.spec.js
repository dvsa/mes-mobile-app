import { async, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavParamsMock, ConfigMock, PlatformMock, NavControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { Store } from '@ngrx/store';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { MockComponent } from 'ng-mocks';
import { DebriefWitnessedComponent } from '../../../../components/test-finalisation/debrief-witnessed/debrief-witnessed';
import { LanguagePreferencesComponent } from '../../../../components/test-finalisation/language-preference/language-preferences';
import { FinalisationHeaderComponent } from '../../../../components/test-finalisation/finalisation-header/finalisation-header';
import { PassFinalisationViewDidEnter, } from '../../pass-finalisation.actions';
import { DebriefWitnessed, DebriefUnwitnessed } from '../../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish } from '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { PassFinalisationCatADIPart2Page } from '../pass-finalisation.cat-adi-part2.page';
import { WarningBannerComponent } from '../../../../components/common/warning-banner/warning-banner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { configureTestSuite } from 'ng-bullet';
import { CONFIRM_TEST_DETAILS } from '../../../page-names.constants';
describe('PassFinalisationCatADIPart2Page', function () {
    var fixture;
    var component;
    var store$;
    var navController;
    jasmine.getEnv().allowRespy(true);
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PassFinalisationCatADIPart2Page,
                MockComponent(DebriefWitnessedComponent),
                MockComponent(FinalisationHeaderComponent),
                MockComponent(LanguagePreferencesComponent),
                MockComponent(WarningBannerComponent),
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
        fixture = TestBed.createComponent(PassFinalisationCatADIPart2Page);
        component = fixture.componentInstance;
        component.subscription = new Subscription();
        store$ = TestBed.get(Store);
        navController = TestBed.get(NavController);
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
            it('should dispatch the PersistTests action', function () {
                component.slotId = '123';
                component.onSubmit();
                expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
            });
            it('should remove pass finalisation from view', fakeAsync(function () {
                spyOn(navController, 'push').and.returnValue(Promise.resolve());
                component.onSubmit();
                flushMicrotasks();
                expect(navController.push).toHaveBeenCalledWith(CONFIRM_TEST_DETAILS);
            }));
            it('should dispatch the appropriate ValidationError actions', fakeAsync(function () {
                component.form = new FormGroup({
                    requiredControl1: new FormControl(null, [Validators.required]),
                    notRequiredControl: new FormControl(null),
                });
            }));
        });
    });
});
//# sourceMappingURL=pass-finalisation.cat-adi-part2.page.spec.js.map