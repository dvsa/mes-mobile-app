import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, ModalController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, ModalControllerMock, } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { AppModule } from '../../../../app/app.module';
import { TestReportCatBEPage } from '../test-report.cat-be.page';
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
import { StoreModule } from '@ngrx/store';
import { testReportReducer } from '../../test-report.reducer';
import { LegalRequirementComponent } from '../../components/legal-requirement/legal-requirement';
import { EtaComponent } from '../../components/examiner-takes-action/eta';
import { initialState } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { EcoComponent } from '../../components/eco/eco';
import { TestReportValidatorProvider } from '../../../../providers/test-report-validator/test-report-validator';
import { TestReportValidatorProviderMock, } from '../../../../providers/test-report-validator/__mocks__/test-report-validator.mock';
import { ModalEvent } from '../../test-report.constants';
import { CAT_BE } from '../../../page-names.constants';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { UncoupleRecoupleComponent } from '../../components/uncouple-recouple/uncouple-recouple';
import { VehicleChecksComponent } from '../components/vehicle-checks/vehicle-checks';
import { configureTestSuite } from 'ng-bullet';
import { ReverseLeftComponent } from '../../components/reverse-left/reverse-left';
import { ReverseLeftPopoverComponent } from '../../components/reverse-left-popover/reverse-left-popover';
describe('TestReportCatBEPage', function () {
    var fixture;
    var component;
    var navController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [TestReportCatBEPage,
                MockComponent(TickIndicatorComponent),
                MockComponent(CompetencyComponent),
                MockComponent(CompetencyButtonComponent),
                MockComponent(LegalRequirementComponent),
                MockComponent(EtaComponent),
                MockComponent(DrivingFaultSummaryComponent),
                MockComponent(ToolbarComponent),
                MockComponent(EcoComponent),
                MockComponent(UncoupleRecoupleComponent),
                MockComponent(ReverseLeftComponent),
                MockComponent(ReverseLeftPopoverComponent),
                MockComponent(VehicleChecksComponent),
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
        fixture = TestBed.createComponent(TestReportCatBEPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
    }));
    describe('Class', function () {
        describe('onModalDismiss', function () {
            it('should navigate to debrief page when passed a CONTINUE event', function () {
                component.onModalDismiss(ModalEvent.CONTINUE);
                var calls = navController.push.calls;
                expect(calls.argsFor(0)[0]).toBe(CAT_BE.DEBRIEF_PAGE);
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
//# sourceMappingURL=test-report.cat-be.page.spec.js.map