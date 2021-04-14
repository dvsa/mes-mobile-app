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
import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { Store, select } from '@ngrx/store';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { DebriefViewDidEnter, EndDebrief } from '../debrief.actions';
import { merge } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestData } from '../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getETA, getEco, } from '../../../modules/tests/test-data/common/test-data.selector';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from '@ngx-translate/core';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_B, DASHBOARD_PAGE } from '../../page-names.constants';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { getTestOutcome } from '../debrief.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { TestOutcome } from '../../../shared/models/test-outcome';
var DebriefCatBPage = /** @class */ (function (_super) {
    __extends(DebriefCatBPage, _super);
    function DebriefCatBPage(store$, navController, navParams, platform, authenticationProvider, screenOrientation, insomnia, translate, faultCountProvider, faultSummaryProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider, store$) || this;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        _this.translate = translate;
        _this.faultCountProvider = faultCountProvider;
        _this.faultSummaryProvider = faultSummaryProvider;
        _this.hasPhysicalEta = false;
        _this.hasVerbalEta = false;
        _this.adviceGivenControl = false;
        _this.adviceGivenPlanning = false;
        return _this;
    }
    DebriefCatBPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category$ = currentTest$.pipe(select(getTestCategory));
        this.pageState = {
            seriousFaults$: currentTest$.pipe(select(getTestData), map(function (data) {
                return _this.faultSummaryProvider.getSeriousFaultsList(data, "B" /* B */)
                    .map(function (fault) { return fault.competencyIdentifier; });
            })),
            dangerousFaults$: currentTest$.pipe(select(getTestData), map(function (data) {
                return _this.faultSummaryProvider.getDangerousFaultsList(data, "B" /* B */)
                    .map(function (fault) { return fault.competencyIdentifier; });
            })),
            drivingFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getDrivingFaultsList(data, "B" /* B */); })),
            drivingFaultCount$: currentTest$.pipe(select(getTestData), withLatestFrom(category$), map(function (_a) {
                var testData = _a[0], category = _a[1];
                return _this.faultCountProvider.getDrivingFaultSumCount(category, testData);
            })),
            etaFaults$: currentTest$.pipe(select(getTestData), select(getETA)),
            ecoFaults$: currentTest$.pipe(select(getTestData), select(getEco)),
            testResult$: currentTest$.pipe(select(getTestOutcome)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
        };
        var _a = this.pageState, testResult$ = _a.testResult$, etaFaults$ = _a.etaFaults$, ecoFaults$ = _a.ecoFaults$, conductedLanguage$ = _a.conductedLanguage$;
        this.subscription = merge(testResult$.pipe(map(function (result) { return _this.outcome = result; })), etaFaults$.pipe(map(function (eta) {
            _this.hasPhysicalEta = eta.physical;
            _this.hasVerbalEta = eta.verbal;
        })), ecoFaults$.pipe(map(function (eco) {
            _this.adviceGivenControl = eco.adviceGivenControl;
            _this.adviceGivenPlanning = eco.adviceGivenPlanning;
        })), conductedLanguage$.pipe(tap(function (value) { return configureI18N(value, _this.translate); }))).subscribe();
    };
    DebriefCatBPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new DebriefViewDidEnter());
    };
    DebriefCatBPage.prototype.ionViewDidLeave = function () {
        _super.prototype.ionViewDidLeave.call(this);
        if (this.isTestReportPracticeMode) {
            if (_super.prototype.isIos.call(this)) {
                this.screenOrientation.unlock();
                this.insomnia.allowSleepAgain();
            }
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DebriefCatBPage.prototype.endDebrief = function () {
        if (this.isTestReportPracticeMode) {
            var dashboardPage = this.navController.getViews().find(function (view) { return view.id === DASHBOARD_PAGE; });
            this.navController.popTo(dashboardPage, { animate: false });
            return;
        }
        this.store$.dispatch(new EndDebrief());
        if (this.outcome === TestOutcome.PASS) {
            this.navController.push(CAT_B.PASS_FINALISATION_PAGE);
            return;
        }
        this.navController.push(CAT_B.POST_DEBRIEF_HOLDING_PAGE);
    };
    DebriefCatBPage = __decorate([
        IonicPage(),
        Component({
            selector: '.debrief-cat-b-page',
            templateUrl: 'debrief.cat-b.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            ScreenOrientation,
            Insomnia,
            TranslateService,
            FaultCountProvider,
            FaultSummaryProvider])
    ], DebriefCatBPage);
    return DebriefCatBPage;
}(PracticeableBasePageComponent));
export { DebriefCatBPage };
//# sourceMappingURL=debrief.cat-b.page.js.map