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
import { IonicPage, ModalController, NavController, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { CAT_HOME_TEST, CONFIRM_TEST_DETAILS } from '../../page-names.constants';
import { merge } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData, getActivityCode, getTestOutcome, isTestOutcomeSet, getTestOutcomeText, } from '../../../modules/tests/tests.selector';
import { getCandidate } from '../../../modules/tests/journal-data/cat-home/candidate/candidate.cat-home.reducer';
import { getUntitledCandidateName, getCandidateDriverNumber, formatDriverNumber, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { NonPassFinalisationViewDidEnter, NonPassFinalisationValidationError, } from '../non-pass-finalisation.actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { isDebriefWitnessed, getD255 } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { getTestSlotAttributes, } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { isWelshTest } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { activityCodeModelList, } from '../../office/components/activity-code/activity-code.constants';
import { FormGroup } from '@angular/forms';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../office/office-behaviour-map.cat-home-test';
import { DebriefWitnessed, DebriefUnwitnessed, D255Yes, D255No, } from '../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { ActivityCodeFinalisationProvider, } from '../../../providers/activity-code-finalisation/activity-code-finalisation';
import { TestDataByCategoryProvider } from '../../../providers/test-data-by-category/test-data-by-category';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
var NonPassFinalisationCatHomeTestPage = /** @class */ (function (_super) {
    __extends(NonPassFinalisationCatHomeTestPage, _super);
    function NonPassFinalisationCatHomeTestPage(store$, navController, platform, authenticationProvider, outcomeBehaviourProvider, modalController, activityCodeFinalisationProvider, testDataByCategory) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        _this.modalController = modalController;
        _this.activityCodeFinalisationProvider = activityCodeFinalisationProvider;
        _this.testDataByCategory = testDataByCategory;
        _this.onCancel = function () {
            _this.invalidTestDataModal.dismiss();
        };
        _this.onReturnToTestReport = function () {
            _this.invalidTestDataModal.dismiss();
            _this.navController.push(CAT_HOME_TEST.TEST_REPORT_PAGE);
        };
        _this.form = new FormGroup({});
        _this.activityCodeOptions = activityCodeModelList;
        _this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
        return _this;
    }
    NonPassFinalisationCatHomeTestPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category$ = currentTest$.pipe(select(getTestCategory), map(function (category) { return category; }));
        this.pageState = {
            slotId$: this.store$.pipe(select(getTests), map(function (tests) { return tests.currentTest.slotId; })),
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            candidateDriverNumber$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateDriverNumber), map(formatDriverNumber)),
            isTestOutcomeSet$: currentTest$.pipe(select(isTestOutcomeSet)),
            testOutcome$: currentTest$.pipe(select(getTestOutcome)),
            testOutcomeText$: currentTest$.pipe(select(getTestOutcomeText)),
            activityCode$: currentTest$.pipe(select(getActivityCode)),
            displayDebriefWitnessed$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(isDebriefWitnessed))), map(function (_a) {
                var outcome = _a[0], debrief = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'debriefWitnessed', debrief);
            })),
            debriefWitnessed$: currentTest$.pipe(select(getTestSummary), select(isDebriefWitnessed)),
            displayD255$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(getD255))), map(function (_a) {
                var outcome = _a[0], d255 = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'd255', d255);
            })),
            d255$: currentTest$.pipe(select(getTestSummary), select(getD255)),
            isWelshTest$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(isWelshTest)),
            testData$: currentTest$.pipe(withLatestFrom(category$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.testDataByCategory.getTestDataByCategoryCode(category)(data);
            })),
        };
        var _a = this.pageState, testData$ = _a.testData$, slotId$ = _a.slotId$, activityCode$ = _a.activityCode$;
        this.subscription = merge(slotId$.pipe(map(function (slotId) { return _this.slotId = slotId; })), testData$.pipe(map(function (testData) { return _this.testData = testData; })), activityCode$.pipe(map(function (activityCode) { return _this.activityCode = activityCode; })), category$.pipe(map(function (category) { return _this.category = category; }))).subscribe();
    };
    NonPassFinalisationCatHomeTestPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new NonPassFinalisationViewDidEnter());
    };
    NonPassFinalisationCatHomeTestPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    NonPassFinalisationCatHomeTestPage.prototype.openTestDataValidationModal = function () {
        this.invalidTestDataModal = this.modalController.create('TestFinalisationInvalidTestDataModal', {
            onCancel: this.onCancel,
            onReturnToTestReport: this.onReturnToTestReport,
        }, { cssClass: 'mes-modal-alert text-zoom-regular' });
        this.invalidTestDataModal.present();
    };
    NonPassFinalisationCatHomeTestPage.prototype.continue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var testDataIsInvalid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
                        if (!this.form.valid) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.activityCodeFinalisationProvider
                                .catHomeTestDataIsInvalid(this.activityCode.activityCode, this.testData, this.category)];
                    case 1:
                        testDataIsInvalid = _a.sent();
                        if (testDataIsInvalid) {
                            this.openTestDataValidationModal();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.navController.push(CONFIRM_TEST_DETAILS)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        Object.keys(this.form.controls).forEach(function (controlName) {
                            if (_this.form.controls[controlName].invalid) {
                                _this.store$.dispatch(new NonPassFinalisationValidationError(controlName + " is blank"));
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NonPassFinalisationCatHomeTestPage.prototype.activityCodeChanged = function (activityCodeModel) {
        this.activityCode = activityCodeModel;
        this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
    };
    NonPassFinalisationCatHomeTestPage.prototype.debriefWitnessedChanged = function (debriefWitnessed) {
        this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
    };
    NonPassFinalisationCatHomeTestPage.prototype.d255Changed = function (d255) {
        this.store$.dispatch(d255 ? new D255Yes() : new D255No());
    };
    NonPassFinalisationCatHomeTestPage.prototype.isWelshChanged = function (isWelsh) {
        this.store$.dispatch(isWelsh ?
            new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
            : new CandidateChoseToProceedWithTestInEnglish('English'));
    };
    NonPassFinalisationCatHomeTestPage = __decorate([
        IonicPage(),
        Component({
            selector: '.non-pass-finalisation-cat-home-test-page',
            templateUrl: 'non-pass-finalisation.cat-home-test.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            Platform,
            AuthenticationProvider,
            OutcomeBehaviourMapProvider,
            ModalController,
            ActivityCodeFinalisationProvider,
            TestDataByCategoryProvider])
    ], NonPassFinalisationCatHomeTestPage);
    return NonPassFinalisationCatHomeTestPage;
}(BasePageComponent));
export { NonPassFinalisationCatHomeTestPage };
//# sourceMappingURL=non-pass-finalisation.cat-home-test.page.js.map