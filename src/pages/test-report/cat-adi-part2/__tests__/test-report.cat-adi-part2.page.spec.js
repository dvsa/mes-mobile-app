import { ManoeuvresComponent } from '../components/manoeuvres/manoeuvres';
import { ManoeuvresPopoverComponentAdiPart2 } from '../components/manoeuvres-popover/manoeuvres-popover';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, ModalController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, ModalControllerMock, StatusBarMock, } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { AppModule } from '../../../../app/app.module';
import { TestReportCatADIPart2Page } from '../test-report.cat-adi-part2.page';
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
// TO-DO ADI PART2: Use correct reducer
import { initialState } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { ControlledStopComponent } from '../../components/controlled-stop/controlled-stop';
import { ManoeuvreCompetencyComponent } from '../../components/manoeuvre-competency/manoeuvre-competency';
import { VehicleCheckComponent } from '../components/vehicle-check/vehicle-check';
import { EcoComponent } from '../../components/eco/eco';
import { TestReportValidatorProvider } from '../../../../providers/test-report-validator/test-report-validator';
import { TestReportValidatorProviderMock, } from '../../../../providers/test-report-validator/__mocks__/test-report-validator.mock';
import { ModalEvent } from '../../test-report.constants';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { StatusBar } from '@ionic-native/status-bar';
import { CAT_ADI_PART2 } from '../../../page-names.constants';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
describe('TestReportCatADIPart2Page', function () {
    var fixture;
    var component;
    var navController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [TestReportCatADIPart2Page,
                MockComponent(ManoeuvresPopoverComponentAdiPart2),
                MockComponent(ManoeuvresComponent),
                MockComponent(TickIndicatorComponent),
                MockComponent(CompetencyComponent),
                MockComponent(CompetencyButtonComponent),
                MockComponent(LegalRequirementComponent),
                MockComponent(EtaComponent),
                MockComponent(DrivingFaultSummaryComponent),
                MockComponent(ToolbarComponent),
                MockComponent(ControlledStopComponent),
                MockComponent(ManoeuvreCompetencyComponent),
                MockComponent(VehicleCheckComponent),
                MockComponent(EcoComponent),
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
                { provide: ScreenOrientation, useClass: ScreenOrientationMock },
                { provide: Insomnia, useClass: InsomniaMock },
                { provide: StatusBar, useFactory: function () { return StatusBarMock.instance(); } },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TestReportCatADIPart2Page);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
    }));
    describe('Class', function () {
        describe('onModalDismiss', function () {
            it('should navigate to debrief page when passed a CONTINUE event', function () {
                component.onModalDismiss(ModalEvent.CONTINUE);
                var calls = navController.push.calls;
                expect(calls.argsFor(0)[0]).toBe(CAT_ADI_PART2.DEBRIEF_PAGE);
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
//# sourceMappingURL=test-report.cat-adi-part2.page.spec.js.map