import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, ModalController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, ModalControllerMock, } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { AppModule } from '../../../../app/app.module';
import { TestReportCatAMod1Page } from '../test-report.cat-a-mod1.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { CompetencyComponent } from '../../components/competency/competency';
import { CompetencyButtonComponent } from '../../components/competency-button/competency-button';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { DrivingFaultSummaryComponent } from '../../components/driving-fault-summary/driving-fault-summary';
import { TickIndicatorComponent } from '../../../../components/common/tick-indicator/tick-indicator';
import { ToolbarComponent } from '../../components/toolbar/toolbar';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { testReportReducer } from '../../test-report.reducer';
import { LegalRequirementComponent } from '../../components/legal-requirement/legal-requirement';
import { EtaComponent } from '../../components/examiner-takes-action/eta';
import { initialState } from '../../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { EcoComponent } from '../../components/eco/eco';
import { TestReportValidatorProvider } from '../../../../providers/test-report-validator/test-report-validator';
import { TestReportValidatorProviderMock, } from '../../../../providers/test-report-validator/__mocks__/test-report-validator.mock';
import { ModalEvent } from '../../test-report.constants';
import { CAT_A_MOD1 } from '../../../page-names.constants';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
import { SpeedCheckHeaderComponent } from '../components/speed-check-header/speed-check-header';
import { SpeedCheckComponent } from '../components/speed-check/speed-check';
import { SetActivityCode } from '../../../../modules/tests/activity-code/activity-code.actions';
import { CalculateTestResult, TerminateTestFromTestReport } from '../../test-report.actions';
import { SpeedCheckState } from '../../../../providers/test-report-validator/test-report-validator.constants';
import { ModalReason } from '../components/activity-code-4-modal/activity-code-4-modal.constants';
import { SingleFaultCompetencyComponent } from '../../components/single-fault-competency/single-fault-competency';
import { competencyLabels } from '../../../../shared/constants/competencies/competencies';
describe('TestReportCatAMod1Page', function () {
    var fixture;
    var component;
    var navController;
    var modalController;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [TestReportCatAMod1Page,
                MockComponent(TickIndicatorComponent),
                MockComponent(CompetencyComponent),
                MockComponent(SingleFaultCompetencyComponent),
                MockComponent(CompetencyButtonComponent),
                MockComponent(LegalRequirementComponent),
                MockComponent(EtaComponent),
                MockComponent(DrivingFaultSummaryComponent),
                MockComponent(ToolbarComponent),
                MockComponent(EcoComponent),
                MockComponent(SpeedCheckHeaderComponent),
                MockComponent(SpeedCheckComponent),
            ],
            imports: [
                IonicModule,
                AppModule,
                StoreModule.forFeature('tests', function () { return ({
                    currentTest: {
                        slotId: '123',
                    },
                    testStatus: {},
                    startedTests: {
                        123: {
                            testData: initialState,
                            journalData: {
                                candidate: candidateMock,
                            },
                        },
                    },
                }); }),
                StoreModule.forFeature('testReport', testReportReducer),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: ModalController, useFactory: function () { return ModalControllerMock.instance(); } },
                { provide: TestReportValidatorProvider, useClass: TestReportValidatorProviderMock },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TestReportCatAMod1Page);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        modalController = TestBed.get(ModalController);
        store$ = TestBed.get(Store);
    }));
    describe('Class', function () {
        describe('onModalDismiss', function () {
            it('should navigate to debrief page when passed a CONTINUE event', function () {
                component.onModalDismiss(ModalEvent.CONTINUE);
                var calls = navController.push.calls;
                expect(calls.argsFor(0)[0]).toBe(CAT_A_MOD1.DEBRIEF_PAGE);
            });
            it('should navigate to debrief page when passed a TERMINATE event', function () {
                component.onModalDismiss(ModalEvent.TERMINATE);
                var calls = navController.push.calls;
                expect(calls.argsFor(0)[0]).toBe(CAT_A_MOD1.DEBRIEF_PAGE);
            });
            it('should navigate to debrief page when passed a END_WITH_ACTIVITY_CODE_4', function () {
                component.onModalDismiss(ModalEvent.END_WITH_ACTIVITY_CODE_4);
                var calls = navController.push.calls;
                expect(calls.argsFor(0)[0]).toBe(CAT_A_MOD1.DEBRIEF_PAGE);
            });
            it('should set activity code to 4 when passed an END_WITH_ACTIVITY_CODE_4 event', function () {
                spyOn(component.store$, 'dispatch');
                component.onModalDismiss(ModalEvent.END_WITH_ACTIVITY_CODE_4);
                expect(component.store$.dispatch).toHaveBeenCalledWith(new SetActivityCode('4'));
            });
            it('should dispatch CalculateTestResult action', function () {
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.onModalDismiss(ModalEvent.CONTINUE);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new CalculateTestResult());
            });
            it('should dispatch TerminateTestFromTestReport action', function () {
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.onModalDismiss(ModalEvent.TERMINATE);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new TerminateTestFromTestReport());
            });
        });
        describe('createEtaInvalidModal', function () {
            it('should create an EtaInvalidModal when isEtaValid is false', function () {
                component.isEtaValid = false;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var modalName = 'EtaInvalidModal';
                var calls = modalController.create.calls;
                component.createEtaInvalidModal(options);
                expect(calls.count()).toBe(1);
                expect(calls.argsFor(0)[0]).toBe(modalName);
                expect(calls.argsFor(0)[1]).toEqual({});
                expect(calls.argsFor(0)[2]).toEqual(options);
            });
            it('should return null when isEtaValid is true', function () {
                component.isEtaValid = true;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var result = component.createEtaInvalidModal(options);
                expect(result).toBeNull();
            });
        });
        describe('createEndTestModal', function () {
            it('should create an EndTestModal when speedCheckState is VALID', function () {
                component.speedCheckState = SpeedCheckState.VALID;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var modalName = 'EndTestModal';
                var calls = modalController.create.calls;
                component.createEndTestModal(options);
                expect(calls.count()).toBe(1);
                expect(calls.argsFor(0)[0]).toBe(modalName);
                expect(calls.argsFor(0)[1]).toEqual({});
                expect(calls.argsFor(0)[2]).toEqual(options);
            });
            it('should return null when speedCheckState is not VALID', function () {
                component.speedCheckState = SpeedCheckState.NOT_MET;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var result = component.createEndTestModal(options);
                expect(result).toBeNull();
            });
        });
        describe('createSpeedCheckModal', function () {
            it('should create the right SpeedCheckModal when EMERGENCY_STOP_AND_AVOIDANCE_MISSING', function () {
                component.speedCheckState = SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var modalName = 'SpeedCheckModal';
                var calls = modalController.create.calls;
                component.createSpeedCheckModal(options);
                expect(calls.count()).toBe(1);
                expect(calls.argsFor(0)[0]).toBe(modalName);
                expect(calls.argsFor(0)[1]).toEqual({
                    speedChecksNeedCompleting: [
                        competencyLabels.speedCheckEmergency,
                        competencyLabels.speedCheckAvoidance,
                    ],
                });
                expect(calls.argsFor(0)[2]).toEqual(options);
            });
            it('should create the right SpeedCheckModal when EMERGENCY_STOP_MISSING', function () {
                component.speedCheckState = SpeedCheckState.EMERGENCY_STOP_MISSING;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var modalName = 'SpeedCheckModal';
                var calls = modalController.create.calls;
                component.createSpeedCheckModal(options);
                expect(calls.count()).toBe(1);
                expect(calls.argsFor(0)[0]).toBe(modalName);
                expect(calls.argsFor(0)[1]).toEqual({
                    speedChecksNeedCompleting: [
                        competencyLabels.speedCheckEmergency,
                    ],
                });
                expect(calls.argsFor(0)[2]).toEqual(options);
            });
            it('should create the right SpeedCheckModal when AVOIDANCE_MISSING', function () {
                component.speedCheckState = SpeedCheckState.AVOIDANCE_MISSING;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var modalName = 'SpeedCheckModal';
                var calls = modalController.create.calls;
                component.createSpeedCheckModal(options);
                expect(calls.count()).toBe(1);
                expect(calls.argsFor(0)[0]).toBe(modalName);
                expect(calls.argsFor(0)[1]).toEqual({
                    speedChecksNeedCompleting: [
                        competencyLabels.speedCheckAvoidance,
                    ],
                });
                expect(calls.argsFor(0)[2]).toEqual(options);
            });
            it('should return null when nor emergency stop nor avoidance is missing', function () {
                component.speedCheckState = SpeedCheckState.VALID;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var result = component.createSpeedCheckModal(options);
                expect(result).toBeNull();
            });
        });
        describe('createActivityCode4Modal', function () {
            it('should create the right ActivityCode4Modal when speedCheckState is NOT_MET', function () {
                component.speedCheckState = SpeedCheckState.NOT_MET;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var modalName = 'ActivityCode4Modal';
                var calls = modalController.create.calls;
                component.createActivityCode4Modal(options);
                expect(calls.count()).toBe(1);
                expect(calls.argsFor(0)[0]).toBe(modalName);
                expect(calls.argsFor(0)[1]).toEqual({
                    modalReason: ModalReason.SPEED_REQUIREMENTS,
                });
                expect(calls.argsFor(0)[2]).toEqual(options);
            });
            it('should create the right ActivityCode4Modal when speedCheckState is EMERGENCY_STOP_DANGEROUS_FAULT', function () {
                component.speedCheckState = SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var modalName = 'ActivityCode4Modal';
                var calls = modalController.create.calls;
                component.createActivityCode4Modal(options);
                expect(calls.count()).toBe(1);
                expect(calls.argsFor(0)[0]).toBe(modalName);
                expect(calls.argsFor(0)[1]).toEqual({
                    modalReason: ModalReason.EMERGENCY_STOP_DANGEROUS,
                });
                expect(calls.argsFor(0)[2]).toEqual(options);
            });
            it('should create the right ActivityCode4Modal whe speedCheckState is EMERGENCY_STOP_SERIOUS_FAULT', function () {
                component.speedCheckState = SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var modalName = 'ActivityCode4Modal';
                var calls = modalController.create.calls;
                component.createActivityCode4Modal(options);
                expect(calls.count()).toBe(1);
                expect(calls.argsFor(0)[0]).toBe(modalName);
                expect(calls.argsFor(0)[1]).toEqual({
                    modalReason: ModalReason.EMERGENCY_STOP_SERIOUS,
                });
                expect(calls.argsFor(0)[2]).toEqual(options);
            });
            it('should return null speed req is met and not serious or dangerous fault on Emergency Stop', function () {
                component.speedCheckState = SpeedCheckState.VALID;
                var options = {
                    optionProperty: 'optionProperty',
                };
                var result = component.createActivityCode4Modal(options);
                expect(result).toBeNull();
            });
        });
    });
    describe('DOM', function () {
        describe('Fault Modes Styling', function () {
            it('should not have any fault mode styles applied when serious and dangerous mode is disabled', function () {
                expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeNull();
                expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeNull();
            });
            it('should have serious fault mode styles applied when serious mode is enabled', function () {
                component.isSeriousMode = true;
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeDefined();
                expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeNull();
            });
            it('should have dangerous fault mode styles applied when dangerous mode is enabled', function () {
                component.isDangerousMode = true;
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeNull();
                expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeDefined();
            });
        });
    });
    describe('End Test Button', function () {
        it('should call the end test function', function () {
            spyOn(component, 'onEndTestClick');
            var endTestButton = fixture.debugElement.query(By.css('#end-test-button'));
            endTestButton.triggerEventHandler('click', null);
            expect(component.onEndTestClick).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=test-report.cat-a-mod1.page.spec.js.map