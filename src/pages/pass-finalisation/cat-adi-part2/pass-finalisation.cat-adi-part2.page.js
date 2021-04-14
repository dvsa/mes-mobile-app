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
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { PassFinalisationViewDidEnter, } from './../pass-finalisation.actions';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName, } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getCurrentTest, getJournalData, getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { map } from 'rxjs/operators';
import { getTests } from '../../../modules/tests/tests.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CONFIRM_TEST_DETAILS } from '../../page-names.constants';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { isDebriefWitnessed } from '../../../modules/tests/test-summary/common/test-summary.selector';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../office/office-behaviour-map.cat-adi-part2';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish, } from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage, } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { DebriefWitnessed, DebriefUnwitnessed, D255No, } from '../../../modules/tests/test-summary/common/test-summary.actions';
var PassFinalisationCatADIPart2Page = /** @class */ (function (_super) {
    __extends(PassFinalisationCatADIPart2Page, _super);
    function PassFinalisationCatADIPart2Page(store$, navController, navParams, platform, authenticationProvider, outcomeBehaviourProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        _this.testOutcome = ActivityCodes.PASS;
        _this.form = new FormGroup({});
        _this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
        // Dispatching this action as D255 is not present in ADI pt2 but it is a mandatory field in TARS
        store$.dispatch(new D255No());
        return _this;
    }
    PassFinalisationCatADIPart2Page.prototype.ngOnInit = function () {
        var _this = this;
        this.store$.pipe(select(getTests), map(function (tests) { return tests.currentTest.slotId; })).subscribe(function (slotId) { return _this.slotId = slotId; });
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateName)),
            candidateUntitledName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            candidateDriverNumber$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getCandidateDriverNumber), map(formatDriverNumber)),
            testOutcomeText$: currentTest$.pipe(select(getTestOutcomeText)),
            debriefWitnessed$: currentTest$.pipe(select(getTestSummary), select(isDebriefWitnessed)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
        };
    };
    PassFinalisationCatADIPart2Page.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    PassFinalisationCatADIPart2Page.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new PassFinalisationViewDidEnter());
    };
    PassFinalisationCatADIPart2Page.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.store$.dispatch(new PersistTests());
            this.navController.push(CONFIRM_TEST_DETAILS);
            return;
        }
    };
    PassFinalisationCatADIPart2Page.prototype.isWelshChanged = function (isWelsh) {
        this.store$.dispatch(isWelsh ?
            new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
            : new CandidateChoseToProceedWithTestInEnglish('English'));
    };
    PassFinalisationCatADIPart2Page.prototype.debriefWitnessedChanged = function (debriefWitnessed) {
        this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
    };
    PassFinalisationCatADIPart2Page = __decorate([
        IonicPage(),
        Component({
            selector: '.pass-finalisation-cat-adi-part2-page',
            templateUrl: 'pass-finalisation.cat-adi-part2.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            OutcomeBehaviourMapProvider])
    ], PassFinalisationCatADIPart2Page);
    return PassFinalisationCatADIPart2Page;
}(BasePageComponent));
export { PassFinalisationCatADIPart2Page };
//# sourceMappingURL=pass-finalisation.cat-adi-part2.page.js.map