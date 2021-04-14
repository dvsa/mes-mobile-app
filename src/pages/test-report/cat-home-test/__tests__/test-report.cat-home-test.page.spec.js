var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, ModalController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, ModalControllerMock, } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { AppModule } from '../../../../app/app.module';
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
import { EcoComponent } from '../../components/eco/eco';
import { TestReportValidatorProvider } from '../../../../providers/test-report-validator/test-report-validator';
import { TestReportValidatorProviderMock, } from '../../../../providers/test-report-validator/__mocks__/test-report-validator.mock';
import { ModalEvent } from '../../test-report.constants';
import { CAT_HOME_TEST, LEGAL_REQUIREMENTS_MODAL, SPECIAL_REQUIREMENT_MODAL } from '../../../page-names.constants';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { UncoupleRecoupleComponent } from '../../components/uncouple-recouple/uncouple-recouple';
import { VehicleChecksComponent } from '../components/vehicle-checks/vehicle-checks';
import { configureTestSuite } from 'ng-bullet';
import { ReverseLeftPopoverComponent } from '../../components/reverse-left-popover/reverse-left-popover';
import { ReverseLeftComponent } from '../../components/reverse-left/reverse-left';
import { TestReportCatHomeTestPage } from '../test-report.cat-home-test.page';
import { initialState } from '../../../../modules/tests/test-data/cat-home-test/test-data.cat-f.reducer';
import { ControlledStopComponent } from '../../components/controlled-stop/controlled-stop';
import { HighwayCodeSafetyComponent } from '../../components/highway-code-safety/highway-code-safety';
describe('TestReportCatHomeTestPage', function () {
    var fixture;
    var component;
    var navController;
    var modalController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [TestReportCatHomeTestPage,
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
                MockComponent(ControlledStopComponent),
                MockComponent(HighwayCodeSafetyComponent),
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
                            category: 'F',
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
        fixture = TestBed.createComponent(TestReportCatHomeTestPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        modalController = TestBed.get(ModalController);
    }));
    describe('Class', function () {
        describe('getCallback', function () {
            it('should return the callback method', function () {
                var toggleReportOverlaySpy = spyOn(component, 'toggleReportOverlay').and.callThrough();
                component.getCallback().callbackMethod();
                expect(toggleReportOverlaySpy).toHaveBeenCalled();
                expect(component.displayOverlay).toEqual(true);
            });
        });
        describe('When the category is K', function () {
            it('should not show the manoeuvre button', function () {
                component.testCategory = "K" /* K */;
                var result = component.showManoeuvreButton();
                expect(result).toEqual(false);
            });
            it('should not show the special requirement modal', function () {
                var calls = modalController.create.calls;
                component.testCategory = "K" /* K */;
                component.manoeuvresCompleted = false;
                component.isTestReportValid = true;
                component.isEtaValid = true;
                component.onEndTestClick();
                expect(calls
                    .argsFor(0)[0]).toBe('EndTestModal');
            });
        });
        describe('When the category is not K', function () {
            it('should show the manoeuvre button', function () {
                component.testCategory = "F" /* F */;
                var result = component.showManoeuvreButton();
                expect(result).toEqual(true);
            });
        });
        describe('onModalDismiss', function () {
            it('should navigate to debrief page when passed a CONTINUE event', function () {
                component.onModalDismiss(ModalEvent.CONTINUE);
                var calls = navController.push.calls;
                expect(calls.argsFor(0)[0]).toBe(CAT_HOME_TEST.DEBRIEF_PAGE);
            });
            it('should navigate to debrief page when passed a TERMINATE event', function () {
                component.onModalDismiss(ModalEvent.TERMINATE);
                var calls = navController.push.calls;
                expect(calls.argsFor(0)[0]).toBe(CAT_HOME_TEST.DEBRIEF_PAGE);
            });
        });
    });
    describe('DOM', function () {
        describe('Fault Modes Styling', function () {
            it('should not have any fault mode styles applied when serious and dangerous mode is disabled', function () {
                expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeNull();
                expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeNull();
            });
            it('should have serious fault mode styles applied when serious mode is enabled', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    component.isSeriousMode = true;
                    fixture.detectChanges();
                    expect(fixture.debugElement.query(By.css('.serious-mode'))).toBeDefined();
                    expect(fixture.debugElement.query(By.css('.dangerous-mode'))).toBeNull();
                    return [2 /*return*/];
                });
            }); });
            it('should have dangerous fault mode styles applied when dangerous mode is enabled', function () {
                component.isDangerousMode = true;
                component.testCategory = "F" /* F */;
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
        describe('when the test report is invalid', function () {
            it('should show the Legal Requirements modal', function () {
                var calls = modalController.create.calls;
                var endTestButton = fixture.debugElement.query(By.css('#end-test-button'));
                component.testCategory = "K" /* K */;
                component.isTestReportValid = false;
                endTestButton.triggerEventHandler('click', null);
                expect(calls
                    .argsFor(0)[0]).toBe(LEGAL_REQUIREMENTS_MODAL);
            });
        });
        describe('when ETA is invalid', function () {
            it('should show the ETA invalid modal', function () {
                var calls = modalController.create.calls;
                var endTestButton = fixture.debugElement.query(By.css('#end-test-button'));
                component.testCategory = "K" /* K */;
                component.isTestReportValid = true;
                component.isEtaValid = false;
                endTestButton.triggerEventHandler('click', null);
                expect(calls
                    .argsFor(0)[0]).toBe('EtaInvalidModal');
            });
        });
        describe('when the manoeuvres are incomplete and the category is not K', function () {
            it('should show the special requirement modal', function () {
                var calls = modalController.create.calls;
                var endTestButton = fixture.debugElement.query(By.css('#end-test-button'));
                component.testCategory = "F" /* F */;
                component.manoeuvresCompleted = false;
                component.isTestReportValid = true;
                component.isEtaValid = true;
                endTestButton.triggerEventHandler('click', null);
                expect(calls
                    .argsFor(0)[0]).toBe(SPECIAL_REQUIREMENT_MODAL);
            });
        });
    });
});
//# sourceMappingURL=test-report.cat-home-test.page.spec.js.map