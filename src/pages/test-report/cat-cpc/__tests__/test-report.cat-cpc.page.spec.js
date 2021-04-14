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
import { Config, IonicModule, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { ConfigMock, ModalControllerMock, NavControllerMock, NavParamsMock, PlatformMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { CompetencyComponent } from '../../components/competency/competency';
import { initialState } from '../../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { testReportReducer } from '../../test-report.reducer';
import { candidateMock } from '../../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
import { CPCQuestionProvider } from '../../../../providers/cpc-questions/cpc-questions';
import { CpcQuestionsMock } from '../../../../providers/cpc-questions/_mocks_/cpc-questions.mock';
import { TestReportCatCPCPage } from '../test-report.cat-cpc.page';
import { AnswerToggled, PopulateQuestionScore, } from '../../../../modules/tests/test-data/cat-cpc/questions/questions.action';
import { PopulateTestScore } from '../../../../modules/tests/test-data/cat-cpc/overall-score/total-percentage.action';
import { QuestionFiveCardComponent } from '../components/question-five-card/question-five-card';
import { ModuleAssessmentComponent } from '../components/module-assessment/module-assessment';
import { QuestionAnswerComponent } from '../components/question-answer/question-answer';
import { QuestionCardComponent } from '../components/question-card/question-card';
import { QuestionFooterComponent } from '../components/question-footer/question-footer';
import { QuestionScoreComponent } from '../components/question-score/question-score';
import { QuestionSubtitleComponent } from '../components/question-subtitle/question-subtitle';
import { QuestionTitleComponent } from '../components/question-title/question-title';
import { catCPCTestData, mockToggleEvent } from '../__mocks__/test-report.cat-cpc.mock';
import { QuestionNumber } from '../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';
import { TestResultProvider } from '../../../../providers/test-result/test-result';
import { TestResultProviderMock } from '../../../../providers/test-result/__mocks__/test-result.mock';
import { lgvQuestion5, lgvQuestions } from '../../../../shared/constants/cpc-questions/cpc-lgv-questions.constants';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { ModalEvent } from '../../test-report.constants';
import { CalculateTestResult, TerminateTestFromTestReport } from '../../test-report.actions';
import { CAT_CPC } from '../../../page-names.constants';
import { Subscription, of } from 'rxjs';
import { QuestionDelExRadioCardComponent } from '../components/question-del-ex-radio-card/question-del-ex-radio-card';
describe('TestReportCatCPCPage', function () {
    var fixture;
    var component;
    var store$;
    var modalController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TestReportCatCPCPage,
                MockComponent(CompetencyComponent),
                MockComponent(ModuleAssessmentComponent),
                MockComponent(QuestionAnswerComponent),
                MockComponent(QuestionCardComponent),
                MockComponent(QuestionFiveCardComponent),
                MockComponent(QuestionFooterComponent),
                MockComponent(QuestionScoreComponent),
                MockComponent(QuestionSubtitleComponent),
                MockComponent(QuestionTitleComponent),
                MockComponent(QuestionDelExRadioCardComponent),
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
                { provide: ModalController, useFactory: function () { return ModalControllerMock.instance(); } },
                { provide: CPCQuestionProvider, useClass: CpcQuestionsMock },
                { provide: TestResultProvider, useClass: TestResultProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TestReportCatCPCPage);
        component = fixture.componentInstance;
        modalController = TestBed.get(ModalController);
        store$ = TestBed.get(Store);
    }));
    describe('Class', function () {
        describe('questionPageChanged', function () {
            it('should set the value passed into the function to a variable', function () {
                expect(component.pageNumber).toEqual(1);
                component.questionPageChanged(2);
                expect(component.pageNumber).toEqual(2);
            });
        });
        describe('populateAnswer', function () {
            it('should dispatch actions populating the answer selected value & the question scores', function () {
                spyOn(store$, 'dispatch');
                spyOn(component.cpcQuestionProvider, 'getQuestionScore').and.returnValue(5);
                spyOn(component.cpcQuestionProvider, 'getTotalQuestionScore').and.returnValue(40);
                component.testData = catCPCTestData;
                component.populateAnswer(mockToggleEvent);
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new AnswerToggled(true, QuestionNumber.ONE, '2'));
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new PopulateQuestionScore(QuestionNumber.ONE, 5));
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new PopulateTestScore(40));
            });
        });
        describe('onEndTestClick', function () {
            it('should create the end test modal with neccessary params', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            component.questions = [lgvQuestions[0]];
                            component.overallPercentage = 90;
                            return [4 /*yield*/, component.onEndTestClick()];
                        case 1:
                            _a.sent();
                            expect(modalController.create).toHaveBeenCalledWith('CPCEndTestModal', {
                                cpcQuestions: component.questions,
                                totalPercentage: 90,
                                testResult: ActivityCodes.PASS,
                            }, { cssClass: 'mes-modal-alert text-zoom-regular' });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('onModalDismiss', function () {
            it('should calculate the test result if CONTINUE', function () {
                spyOn(store$, 'dispatch');
                spyOn(component.navController, 'push').and.callThrough();
                component.onModalDismiss(ModalEvent.CONTINUE);
                expect(store$.dispatch).toHaveBeenCalledWith(new CalculateTestResult());
                expect(component.navController.push).toHaveBeenCalledWith(CAT_CPC.DEBRIEF_PAGE);
            });
            it('should terminate the test result if TERMINATE', function () {
                spyOn(store$, 'dispatch');
                spyOn(component.navController, 'push').and.callThrough();
                component.onModalDismiss(ModalEvent.TERMINATE);
                expect(store$.dispatch).toHaveBeenCalledWith(new TerminateTestFromTestReport());
                expect(component.navController.push).toHaveBeenCalledWith(CAT_CPC.DEBRIEF_PAGE);
            });
        });
        describe('ionViewWillEnter', function () {
            it('should set up the subscription', function () {
                spyOn(component, 'setUpSubscription');
                component.ionViewWillEnter();
                expect(component.setUpSubscription).toHaveBeenCalled();
            });
        });
        describe('ionViewDidLeave', function () {
            it('should cancel the subscription', function () {
                component.subscription = new Subscription();
                spyOn(component.subscription, 'unsubscribe');
                component.ionViewDidLeave();
                expect(component.subscription.unsubscribe).toHaveBeenCalled();
            });
        });
        describe('setUpSubscription', function () {
            it('should subscribe to all observables and update class properties', function () {
                component.ngOnInit();
                component.pageState.question1$ = of(lgvQuestions[0]);
                component.pageState.question2$ = of(lgvQuestions[1]);
                component.pageState.question3$ = of(lgvQuestions[2]);
                component.pageState.question4$ = of(lgvQuestions[3]);
                component.pageState.question5$ = of(lgvQuestion5[0]);
                component.pageState.overallPercentage$ = of(10);
                component.pageState.category$ = of("CCPC" /* CCPC */);
                component.setUpSubscription();
                expect(component.questions).toEqual([
                    lgvQuestions[0],
                    lgvQuestions[1],
                    lgvQuestions[2],
                    lgvQuestions[3],
                    lgvQuestion5[0],
                ]);
                expect(component.overallPercentage).toEqual(10);
                expect(component.category).toEqual("CCPC" /* CCPC */);
            });
        });
    });
});
//# sourceMappingURL=test-report.cat-cpc.page.spec.js.map