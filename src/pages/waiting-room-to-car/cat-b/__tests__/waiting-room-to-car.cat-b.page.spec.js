import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { WaitingRoomToCarCatBPage } from '../waiting-room-to-car.cat-b.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { EyesightFailureConfirmationComponent, } from '../../components/eyesight-failure-confirmation/eyesight-failure-confirmation';
import { of } from 'rxjs';
import { QuestionProvider } from '../../../../providers/question/question';
import { QuestionProviderMock } from '../../../../providers/question/__mocks__/question.mock';
import { EndTestLinkComponent } from '../../../../components/common/end-test-link/end-test-link';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { VehicleRegistrationComponent } from '../../components/vehicle-registration/vehicle-registration';
import { VehicleDetailsCardComponent } from '../../components/vehicle-details-card/vehicle-details-card';
import { VehicleDetailsComponent } from '../../components/vehicle-details/vehicle-details';
import { AccompanimentCardComponent } from '../../components/accompaniment-card/accompaniment-card';
import { AccompanimentComponent } from '../../components/accompaniment/accompaniment';
import { EyesightTestComponent } from '../../components/eyesight-test/eyesight-test';
import { PracticeModeBanner } from '../../../../components/common/practice-mode-banner/practice-mode-banner';
import { WaitingRoomToCarValidationError } from '../../waiting-room-to-car.actions';
import { TellMeQuestionSelected, } from '../../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { EyesightTestReset } from '../../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TellMeQuestionCardComponent } from '../components/tell-me-question-card/tell-me-question-card';
import { TellMeQuestionComponent } from '../components/tell-me-question/tell-me-question';
import { TellMeQuestionOutcomeComponent } from '../components/tell-me-question-outcome/tell-me-question-outcome';
import { TransmissionComponent } from '../../../../components/common/transmission/transmission';
import { InstructorRegistrationComponent } from '../components/instructor-registration/instructor-registration';
import { configureTestSuite } from 'ng-bullet';
describe('WaitingRoomToCarCatBPage', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                WaitingRoomToCarCatBPage,
                MockComponent(EyesightTestComponent),
                MockComponent(EyesightFailureConfirmationComponent),
                MockComponent(EndTestLinkComponent),
                MockComponent(TellMeQuestionCardComponent),
                MockComponent(TellMeQuestionComponent),
                MockComponent(TellMeQuestionOutcomeComponent),
                MockComponent(VehicleRegistrationComponent),
                MockComponent(InstructorRegistrationComponent),
                MockComponent(TransmissionComponent),
                MockComponent(VehicleDetailsCardComponent),
                MockComponent(VehicleDetailsComponent),
                MockComponent(AccompanimentCardComponent),
                MockComponent(AccompanimentComponent),
                MockComponent(PracticeModeBanner),
            ],
            imports: [
                IonicModule,
                AppModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                vehicleDetails: {},
                                accompaniment: {},
                                testData: {
                                    vehicleChecks: {
                                        tellMeQuestion: {
                                            code: 'T1',
                                            description: 'desc',
                                            outcome: CompetencyOutcome.P,
                                        },
                                    },
                                    seriousFaults: [],
                                    eyesightTest: {},
                                },
                                journalData: {
                                    candidate: {
                                        candidateName: 'Joe Bloggs',
                                    },
                                },
                            },
                        },
                    }); },
                }),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: QuestionProvider, useClass: QuestionProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(WaitingRoomToCarCatBPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        it('should get tell me question from the question provider', function () {
            expect(component.tellMeQuestions.length).toBe(2);
        });
        describe('selecting a tell me question', function () {
            it('should dispatch an action when the tell me question change handler is called', function () {
                var question = {
                    code: 'T1',
                    description: 'desc',
                    shortName: 'name',
                };
                component.tellMeQuestionChanged(question);
                expect(store$.dispatch).toHaveBeenCalledWith(new TellMeQuestionSelected(question));
            });
        });
    });
    describe('DOM', function () {
        describe('eyesight failure confirmation', function () {
            // tslint:disable-next-line:max-line-length
            it('should hide the rest of the form and show eyesight failure confirmation when page state indicates fail is selected', function () {
                fixture.detectChanges();
                component.pageState.eyesightTestComplete$ = of(true);
                component.pageState.eyesightTestFailed$ = of(true);
                fixture.detectChanges();
                var eyesightFailureConfirmation = fixture.debugElement.query(By.css('eyesight-failure-confirmation'));
                var formAfterEyesight = fixture.debugElement.query(By.css('#post-eyesight-form-content'));
                expect(eyesightFailureConfirmation).not.toBeNull();
                expect(formAfterEyesight.nativeElement.hidden).toEqual(true);
            });
            // tslint:disable-next-line:max-line-length
            it('should show the rest of the form and not render eyesight failure confirmation when page state indicates pass is selected', function () {
                fixture.detectChanges();
                component.pageState.eyesightTestComplete$ = of(true);
                fixture.detectChanges();
                var eyesightFailureConfirmation = fixture.debugElement.query(By.css('eyesight-failure-confirmation'));
                var formAfterEyesight = fixture.debugElement.query(By.css('#post-eyesight-form-content'));
                expect(eyesightFailureConfirmation).toBeNull();
                expect(formAfterEyesight.nativeElement.hidden).toEqual(false);
            });
            it('should dispatch an EyesightResultReset action when the when the method is called', function () {
                component.eyesightFailCancelled();
                expect(store$.dispatch).toHaveBeenCalledWith(new EyesightTestReset());
            });
        });
    });
    describe('ionViewWillLeave', function () {
        it('should dispatch the PersistTests action', function () {
            component.ionViewWillLeave();
            expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
        });
    });
    describe('onSubmit', function () {
        it('should dispatch the appropriate WaitingRoomToCarValidationError actions', fakeAsync(function () {
            fixture.detectChanges();
            component.form = new FormGroup({
                requiredControl1: new FormControl(null, [Validators.required]),
                requiredControl2: new FormControl(null, [Validators.required]),
                notRequiredControl: new FormControl(null),
            });
            component.onSubmit();
            tick();
            expect(store$.dispatch)
                .toHaveBeenCalledWith(new WaitingRoomToCarValidationError('requiredControl1 is blank'));
            expect(store$.dispatch)
                .toHaveBeenCalledWith(new WaitingRoomToCarValidationError('requiredControl2 is blank'));
            expect(store$.dispatch)
                .not
                .toHaveBeenCalledWith(new WaitingRoomToCarValidationError('notRequiredControl is blank'));
        }));
    });
});
//# sourceMappingURL=waiting-room-to-car.cat-b.page.spec.js.map