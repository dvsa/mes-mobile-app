var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, } from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { QuestionNumber, } from '../../../shared/constants/cpc-questions/cpc-question-combinations.constants';
import { getTestData } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { getCombination, getQuestion1, getQuestion2, getQuestion3, getQuestion4, getQuestion5, getTotalPercent, } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.selector';
import { AnswerToggled, PopulateQuestionScore, } from '../../../modules/tests/test-data/cat-cpc/questions/questions.action';
import { PopulateTestScore } from '../../../modules/tests/test-data/cat-cpc/overall-score/total-percentage.action';
import { CPCQuestionProvider } from '../../../providers/cpc-questions/cpc-questions';
import { CAT_CPC } from '../../page-names.constants';
import { ModalEvent } from '../test-report.constants';
import { CalculateTestResult, TerminateTestFromTestReport } from '../test-report.actions';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import { getNextPageDebriefOffice } from '../../../shared/constants/getNextPageDebriefOffice.constants';
import { FormGroup } from '@angular/forms';
var TestReportCatCPCPage = /** @class */ (function (_super) {
    __extends(TestReportCatCPCPage, _super);
    function TestReportCatCPCPage(testResultProvider, store$, navController, navParams, platform, authenticationProvider, modalController, cpcQuestionProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.testResultProvider = testResultProvider;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.modalController = modalController;
        _this.cpcQuestionProvider = cpcQuestionProvider;
        _this.pageNumber = 1;
        _this.questionPageChanged = function (pageNumber) {
            _this.pageNumber = pageNumber;
        };
        _this.populateAnswer = function (event) {
            var questionNumber = event.questionNumber, answerNumber = event.answerNumber, answer = event.answer;
            var selected = answer.selected;
            // Update question answered selected value
            var questionNum = _this.translateToQuestionNumberInterface(questionNumber);
            _this.store$.dispatch(new AnswerToggled(selected, questionNum, answerNumber));
            // Update question score
            var question = _this.testData["question" + questionNumber];
            var questionScore = _this.cpcQuestionProvider.getQuestionScore(question, questionNum);
            _this.store$.dispatch(new PopulateQuestionScore(questionNum, questionScore));
            // Update total score
            var totalScore = _this.cpcQuestionProvider.getTotalQuestionScore(_this.testData);
            _this.store$.dispatch(new PopulateTestScore(totalScore));
        };
        _this.translateToQuestionNumberInterface = function (questionNumber) {
            return new Map([
                [1, QuestionNumber.ONE],
                [2, QuestionNumber.TWO],
                [3, QuestionNumber.THREE],
                [4, QuestionNumber.FOUR],
                [5, QuestionNumber.FIVE],
            ]).get(questionNumber);
        };
        _this.populateScore = function (event) {
            // Update question answered selected value
            var questionNum = _this.translateToQuestionNumberInterface(event.questionNumber);
            // Update question score
            _this.store$.dispatch(new PopulateQuestionScore(questionNum, Number(event.score)));
            // Update total score
            var totalScore = _this.cpcQuestionProvider.getTotalQuestionScore(_this.testData);
            _this.store$.dispatch(new PopulateTestScore(totalScore));
        };
        _this.onEndTestClick = function () { return __awaiter(_this, void 0, void 0, function () {
            var options;
            var _this = this;
            return __generator(this, function (_a) {
                options = { cssClass: 'mes-modal-alert text-zoom-regular' };
                this.testResultProvider.calculateTestResult(this.category, this.testData).subscribe(function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this;
                                return [4 /*yield*/, this.modalController.create('CPCEndTestModal', {
                                        cpcQuestions: this.questions,
                                        totalPercentage: this.overallPercentage,
                                        testResult: result,
                                    }, options)];
                            case 1:
                                _a.modal = _b.sent();
                                this.modal.onDidDismiss(this.onModalDismiss);
                                return [4 /*yield*/, this.modal.present()];
                            case 2:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        _this.onModalDismiss = function (event) {
            switch (event) {
                case ModalEvent.CONTINUE:
                    _this.store$.dispatch(new CalculateTestResult());
                    _this.navController.push(getNextPageDebriefOffice(CAT_CPC, _this.isDelegated));
                    break;
                case ModalEvent.TERMINATE:
                    _this.store$.dispatch(new TerminateTestFromTestReport());
                    _this.navController.push(getNextPageDebriefOffice(CAT_CPC, _this.isDelegated));
                    break;
            }
        };
        _this.form = new FormGroup({});
        return _this;
    }
    TestReportCatCPCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        currentTest$.pipe(select(getTestData)).subscribe(function (result) { return _this.testData = result; });
        this.pageState = {
            candidateUntitledName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            combinationCode$: currentTest$.pipe(select(getTestData), select(getCombination)),
            question1$: currentTest$.pipe(select(getTestData), select(getQuestion1)),
            question2$: currentTest$.pipe(select(getTestData), select(getQuestion2)),
            question3$: currentTest$.pipe(select(getTestData), select(getQuestion3)),
            question4$: currentTest$.pipe(select(getTestData), select(getQuestion4)),
            question5$: currentTest$.pipe(select(getTestData), select(getQuestion5)),
            overallPercentage$: currentTest$.pipe(select(getTestData), select(getTotalPercent)),
            category$: currentTest$.pipe(select(getTestCategory)),
            delegatedTest$: currentTest$.pipe(select(getDelegatedTestIndicator), select(isDelegatedTest)),
        };
    };
    TestReportCatCPCPage.prototype.ionViewWillEnter = function () {
        this.setUpSubscription();
    };
    TestReportCatCPCPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TestReportCatCPCPage.prototype.setUpSubscription = function () {
        var _this = this;
        this.subscription = combineLatest(this.pageState.question1$, this.pageState.question2$, this.pageState.question3$, this.pageState.question4$, this.pageState.question5$, this.pageState.overallPercentage$, this.pageState.category$, this.pageState.delegatedTest$).subscribe(function (_a) {
            var question1 = _a[0], question2 = _a[1], question3 = _a[2], question4 = _a[3], question5 = _a[4], overallPercentage = _a[5], category = _a[6], delegated = _a[7];
            _this.questions = [question1, question2, question3, question4, question5];
            _this.overallPercentage = overallPercentage;
            _this.category = category;
            _this.isDelegated = delegated;
        });
    };
    TestReportCatCPCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.test-report-cat-cpc-page',
            templateUrl: 'test-report.cat-cpc.page.html',
        }),
        __metadata("design:paramtypes", [TestResultProvider,
            Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            ModalController,
            CPCQuestionProvider])
    ], TestReportCatCPCPage);
    return TestReportCatCPCPage;
}(BasePageComponent));
export { TestReportCatCPCPage };
//# sourceMappingURL=test-report.cat-cpc.page.js.map