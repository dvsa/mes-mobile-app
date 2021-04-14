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
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { map, withLatestFrom } from 'rxjs/operators';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { CAT_CPC } from '../../page-names.constants';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData, getActivityCode, getTestOutcome, isTestOutcomeSet, getTestOutcomeText, } from '../../../modules/tests/tests.selector';
import { getUntitledCandidateName, getCandidateDriverNumber, formatDriverNumber, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { NonPassFinalisationViewDidEnter, NonPassFinalisationValidationError, } from '../non-pass-finalisation.actions';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { isDebriefWitnessed } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { getTestSlotAttributes, } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { isWelshTest } from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { getActivityCodeOptions, } from '../../office/components/activity-code/activity-code.constants';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../office/office-behaviour-map.cat-cpc';
import { DebriefWitnessed, DebriefUnwitnessed, } from '../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { SetTestStatusWriteUp } from '../../../modules/tests/test-status/test-status.actions';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { ExaminerRole } from '../../../providers/app-config/constants/examiner-role.constants';
var NonPassFinalisationCatCPCPage = /** @class */ (function (_super) {
    __extends(NonPassFinalisationCatCPCPage, _super);
    function NonPassFinalisationCatCPCPage(store$, navController, platform, authenticationProvider, outcomeBehaviourProvider, appConfig) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        _this.appConfig = appConfig;
        _this.form = new FormGroup({});
        _this.activityCodeOptions = getActivityCodeOptions(_this.appConfig.getAppConfig().role === ExaminerRole.DLG);
        _this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
        return _this;
    }
    NonPassFinalisationCatCPCPage.prototype.ngOnInit = function () {
        var _this = this;
        this.store$.pipe(select(getTests), map(function (tests) { return tests.currentTest.slotId; })).subscribe(function (slotId) { return _this.slotId = slotId; });
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            activityCode$: currentTest$.pipe(select(getActivityCode)),
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            candidateDriverNumber$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateDriverNumber), map(formatDriverNumber)),
            isTestOutcomeSet$: currentTest$.pipe(select(isTestOutcomeSet)),
            testOutcome$: currentTest$.pipe(select(getTestOutcome)),
            testOutcomeText$: currentTest$.pipe(select(getTestOutcomeText)),
            displayDebriefWitnessed$: currentTest$.pipe(select(getTestOutcome), withLatestFrom(currentTest$.pipe(select(getTestSummary), select(isDebriefWitnessed))), map(function (_a) {
                var outcome = _a[0], debrief = _a[1];
                return _this.outcomeBehaviourProvider.isVisible(outcome, 'debriefWitnessed', debrief);
            })),
            debriefWitnessed$: currentTest$.pipe(select(getTestSummary), select(isDebriefWitnessed)),
            isWelshTest$: currentTest$.pipe(select(getJournalData), select(getTestSlotAttributes), select(isWelshTest)),
        };
    };
    NonPassFinalisationCatCPCPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new NonPassFinalisationViewDidEnter());
    };
    NonPassFinalisationCatCPCPage.prototype.continue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
                if (this.form.valid) {
                    this.store$.dispatch(new SetTestStatusWriteUp(this.slotId));
                    this.store$.dispatch(new PersistTests());
                    this.navController.push(CAT_CPC.BACK_TO_OFFICE_PAGE);
                    return [2 /*return*/];
                }
                Object.keys(this.form.controls).forEach(function (controlName) {
                    if (_this.form.controls[controlName].invalid) {
                        _this.store$.dispatch(new NonPassFinalisationValidationError(controlName + " is blank"));
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    NonPassFinalisationCatCPCPage.prototype.activityCodeChanged = function (activityCodeModel) {
        this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
    };
    NonPassFinalisationCatCPCPage.prototype.debriefWitnessedChanged = function (debriefWitnessed) {
        this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
    };
    NonPassFinalisationCatCPCPage.prototype.isWelshChanged = function (isWelsh) {
        this.store$.dispatch(isWelsh ?
            new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
            : new CandidateChoseToProceedWithTestInEnglish('English'));
    };
    NonPassFinalisationCatCPCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.non-pass-finalisation-cat-cpc-page',
            templateUrl: 'non-pass-finalisation.cat-cpc.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            Platform,
            AuthenticationProvider,
            OutcomeBehaviourMapProvider,
            AppConfigProvider])
    ], NonPassFinalisationCatCPCPage);
    return NonPassFinalisationCatCPCPage;
}(BasePageComponent));
export { NonPassFinalisationCatCPCPage };
//# sourceMappingURL=non-pass-finalisation.cat-cpc.page.js.map