import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, AlertController, ToastController, } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, AlertControllerMock, } from 'ionic-mocks';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { AppModule } from '../../../../app/app.module';
import { OfficeCatHomeTestPage } from '../office.cat-home-test.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { Store, StoreModule } from '@ngrx/store';
import { ToggleETA } from '../../../../modules/tests/test-data/common/eta/eta.actions';
import { TogglePlanningEco } from '../../../../modules/tests/test-data/common/eco/eco.actions';
import { AddDangerousFault, } from '../../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { AddSeriousFault } from '../../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { EyesightTestFailed } from '../../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { ExaminerActions, Competencies } from '../../../../modules/tests/test-data/test-data.constants';
import { By } from '@angular/platform-browser';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { WeatherConditionsChanged, } from '../../../../modules/tests/test-summary/common/test-summary.actions';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { CandidateDescriptionComponent } from '../../components/candidate-description/candidate-description';
import { ShowMeQuestionComponent } from '../../components/show-me-question/show-me-question';
import { WeatherConditionsComponent } from '../../components/weather-conditions/weather-conditions';
import { AdditionalInformationComponent } from '../../components/additional-information/additional-information';
import { IdentificationComponent } from '../../components/identification/identification';
import { FaultCommentCardComponent } from '../../components/fault-comment-card/fault-comment-card';
import { activityCodeModelList, ActivityCodeDescription, } from '../../components/activity-code/activity-code.constants';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { CompleteTest, OfficeValidationError } from '../../office.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastControllerMock } from '../../__mocks__/toast-controller-mock';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { SetActivityCode } from '../../../../modules/tests/activity-code/activity-code.actions';
import { FaultSummaryProvider } from '../../../../providers/fault-summary/fault-summary';
import { configureTestSuite } from 'ng-bullet';
import { VehicleChecksOfficeCardComponent } from '../../components/vehicle-checks/vehicle-checks-office-card';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
import { CandidateSectionComponent } from '../../components/candidate-section/candidate-section';
import { DateOfTest } from '../../components/date-of-test/date-of-test';
describe('OfficeCatHomeTestPage', function () {
    var fixture;
    var component;
    var navController;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                OfficeCatHomeTestPage,
                MockComponent(CandidateDescriptionComponent),
                MockComponent(IdentificationComponent),
                MockComponent(ShowMeQuestionComponent),
                MockComponent(WeatherConditionsComponent),
                MockComponent(AdditionalInformationComponent),
                MockComponent(FaultCommentCardComponent),
                MockComponent(VehicleChecksOfficeCardComponent),
                MockComponent(CandidateSectionComponent),
                MockComponent(DateOfTest),
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
                                category: "F" /* F */,
                                vehicleDetails: {},
                                accompaniment: {},
                                testData: {
                                    dangerousFaults: {},
                                    drivingFaults: {},
                                    manoeuvres: {},
                                    seriousFaults: {},
                                    testRequirements: {},
                                    ETA: {},
                                    eco: {},
                                    vehicleChecks: {
                                        showMeQuestions: [{
                                                code: 'S3',
                                                description: '',
                                                outcome: '',
                                            }],
                                        tellMeQuestions: [{
                                                code: '',
                                                description: '',
                                                outcome: '',
                                            }],
                                    },
                                    eyesightTest: {},
                                },
                                activityCode: '28',
                                journalData: {
                                    candidate: {
                                        candidateName: 'Joe Bloggs',
                                        driverNumber: '123',
                                    },
                                },
                                rekey: false,
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
                { provide: AlertController, useClass: AlertControllerMock },
                { provide: ToastController, useClass: ToastControllerMock },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
                { provide: FaultSummaryProvider, useClass: FaultSummaryProvider },
                TestDataByCategoryProvider,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(OfficeCatHomeTestPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        describe('weatherConditionsChanged', function () {
            it('should dispatch a weather conditions changed action with the weather condition values', function () {
                var conditions = ['Showers'];
                component.weatherConditionsChanged(conditions);
                expect(store$.dispatch).toHaveBeenCalledWith(new WeatherConditionsChanged(conditions));
            });
        });
        describe('selecting a activity code', function () {
            it('should dispatch a SetActivityCode action with the activity code', function () {
                component.activityCodeChanged(activityCodeModelList[0]);
                expect(store$.dispatch).toHaveBeenCalledWith(new SetActivityCode(activityCodeModelList[0].activityCode));
            });
        });
        describe('completeTest', function () {
            it('should successfully end the test', function () {
                component.completeTest();
                expect(store$.dispatch).toHaveBeenCalledWith(new CompleteTest());
            });
        });
    });
    describe('DOM', function () {
        it('should pass the selected activity code to the activity code subcomponent', function () {
            var activityCodeModel = {
                activityCode: ActivityCodes.ACCIDENT,
                description: ActivityCodeDescription.ACCIDENT,
            };
            fixture.detectChanges();
            var activityCodeElement = fixture.debugElement.query(By.css('activity-code'))
                .componentInstance;
            expect(activityCodeElement.activityCodeModel).toEqual(activityCodeModel);
        });
        it('should hide ETA faults container if there are none', function () {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#ETA'))).toBeNull();
        });
        it('should display ETA faults container if there are any', function () {
            store$.dispatch(new ToggleETA(ExaminerActions.verbal));
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#ETA'))).toBeDefined();
        });
        it('should hide eco faults container if there are none', function () {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#eco'))).toBeNull();
        });
        it('should display eco faults container if there are any', function () {
            store$.dispatch(new TogglePlanningEco());
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#eco'))).toBeDefined();
        });
        it('should display eta fault details if there are any', function () {
            store$.dispatch(new ToggleETA(ExaminerActions.verbal));
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#etaFaults'))).toBeDefined();
        });
        it('should display eco fault details if there are any', function () {
            store$.dispatch(new TogglePlanningEco());
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#ecoFaults'))).toBeDefined();
        });
        it('should not display dangerous fault comment textbox if there are not any', function () {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#dangerousFaultComment'))).toBeNull();
        });
        it('should display dangerous fault comment textbox if there are any', function () {
            store$.dispatch(new AddDangerousFault(Competencies.judgementCrossing));
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#dangerousFaultComment'))).toBeDefined();
        });
        it('should not display serious fault comment textbox if there are not any', function () {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#seriousFaultComment'))).toBeNull();
        });
        it('should display serious fault comment textbox if there are any', function () {
            store$.dispatch(new AddSeriousFault(Competencies.judgementOvertaking));
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#seriousFaultComment'))).toBeDefined();
        });
        it('should display the serious fault comment textbox if the eyesight test is failed', function () {
            store$.dispatch(new EyesightTestFailed());
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#seriousFaultComment'))).toBeDefined();
        });
        describe('deferring the write up', function () {
            it('should dispatch an action to persist tests + pop navstack to root when pressing save and continue', function () {
                fixture.detectChanges();
                var saveAndContinueButton = fixture.debugElement.query(By.css('#defer-button'));
                saveAndContinueButton.triggerEventHandler('click', null);
                fixture.detectChanges();
                expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
                expect(navController.popTo).toHaveBeenCalled();
            });
        });
        describe('driving fault commentary', function () {
            it('should pass whether to render driving fault commentary to fault-comment-card', function () {
                var drivingFaultCommentCard = fixture.debugElement
                    .query(By.css('#driving-fault-comment-card')).componentInstance;
                fixture.detectChanges();
                component.pageState.displayDrivingFaultComments$ = of(true);
                component.pageState.displayDrivingFault$ = of(true);
                fixture.detectChanges();
                expect(drivingFaultCommentCard.shouldRender).toBeTruthy();
                component.pageState.displayDrivingFaultComments$ = of(false);
                fixture.detectChanges();
                expect(drivingFaultCommentCard.shouldRender).toBeFalsy();
            });
        });
        describe('driving fault overview', function () {
            var drivingFaults = [
                {
                    competencyIdentifier: 'signalsTimed',
                    competencyDisplayName: 'Signals - Timed',
                    faultCount: 3,
                    comment: 'dummy',
                },
                {
                    competencyIdentifier: 'useOfSpeed',
                    competencyDisplayName: 'Use of speed',
                    faultCount: 1,
                    comment: 'dummy',
                },
            ];
            it('should display a driving faults badge with the count for each type of driving fault on the test', function () {
                fixture.detectChanges();
                component.pageState.drivingFaults$ = of(drivingFaults);
                component.pageState.drivingFaultCount$ = of(4);
                component.pageState.displayDrivingFaultComments$ = of(false);
                component.pageState.displayDrivingFault$ = of(true);
                fixture.detectChanges();
                var drivingFaultBadges = fixture.debugElement.queryAll(By.css('driving-faults-badge'));
                expect(drivingFaultBadges.length).toBe(2);
                expect(drivingFaultBadges[0].componentInstance.count).toBe(3);
                expect(drivingFaultBadges[1].componentInstance.count).toBe(1);
            });
            it('should render the display name for each driving fault', function () {
                fixture.detectChanges();
                component.pageState.drivingFaults$ = of(drivingFaults);
                component.pageState.drivingFaultCount$ = of(4);
                component.pageState.displayDrivingFaultComments$ = of(false);
                component.pageState.displayDrivingFault$ = of(true);
                fixture.detectChanges();
                var faultLabels = fixture.debugElement.queryAll(By.css('.fault-label'));
                expect(faultLabels.length).toBe(2);
                expect(faultLabels[0].nativeElement.innerHTML).toBe('Signals - Timed');
                expect(faultLabels[1].nativeElement.innerHTML).toBe('Use of speed');
            });
        });
    });
    describe('popToRoot', function () {
        it('should call the popTo method in the navcontroller if not in practice mode', function () {
            component.popToRoot();
            expect(navController.popTo).toHaveBeenCalled();
        });
    });
    describe('onSubmit', function () {
        it('should dispatch the appropriate ValidationError actions', fakeAsync(function () {
            component.form = new FormGroup({
                requiredControl1: new FormControl(null, [Validators.required]),
                requiredControl2: new FormControl(null, [Validators.required]),
                notRequiredControl: new FormControl(null),
            });
            component.onSubmit();
            tick();
            expect(store$.dispatch)
                .toHaveBeenCalledWith(new OfficeValidationError('requiredControl1 is blank'));
            expect(store$.dispatch)
                .toHaveBeenCalledWith(new OfficeValidationError('requiredControl2 is blank'));
            expect(store$.dispatch)
                .not
                .toHaveBeenCalledWith(new OfficeValidationError('notRequiredControl is blank'));
        }));
    });
});
//# sourceMappingURL=office.cat-home-test.page.spec.js.map