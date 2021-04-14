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
import { Store, select } from '@ngrx/store';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { DebriefViewDidEnter, EndDebrief } from '../debrief.actions';
import { merge } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestData } from '../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { getETA } from '../../../modules/tests/test-data/common/test-data.selector';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Component } from '@angular/core';
import { getTestOutcome } from '../debrief.selector';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from '@ngx-translate/core';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_A_MOD1 } from '../../page-names.constants';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { TestOutcome } from '../../../shared/models/test-outcome';
import { getAvoidance, getAvoidanceAttempted, } from '../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.selector';
import { getEmergencyStop } from '../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.selector';
var DebriefCatAMod1Page = /** @class */ (function (_super) {
    __extends(DebriefCatAMod1Page, _super);
    function DebriefCatAMod1Page(store$, navController, navParams, platform, authenticationProvider, screenOrientation, insomnia, translate, faultCountProvider, faultSummaryProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        _this.translate = translate;
        _this.faultCountProvider = faultCountProvider;
        _this.faultSummaryProvider = faultSummaryProvider;
        _this.category = "EUAM1" /* EUAM1 */;
        _this.hasPhysicalEta = false;
        _this.hasVerbalEta = false;
        return _this;
    }
    DebriefCatAMod1Page.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var testCategory$ = currentTest$.pipe(select(getTestCategory), map(function (testCategory) { return testCategory; }));
        this.pageState = {
            testCategory$: testCategory$,
            seriousFaults$: currentTest$.pipe(select(getTestData), map(function (data) {
                return _this.faultSummaryProvider.getSeriousFaultsList(data, "EUAM1" /* EUAM1 */)
                    .map(function (fault) { return fault.competencyIdentifier; });
            })),
            dangerousFaults$: currentTest$.pipe(select(getTestData), map(function (data) {
                return _this.faultSummaryProvider.getDangerousFaultsList(data, "EUAM1" /* EUAM1 */)
                    .map(function (fault) { return fault.competencyIdentifier; });
            })),
            drivingFaults$: currentTest$.pipe(select(getTestData), map(function (data) { return _this.faultSummaryProvider.getDrivingFaultsList(data, "EUAM1" /* EUAM1 */); })),
            drivingFaultCount$: currentTest$.pipe(select(getTestData), withLatestFrom(testCategory$), map(function (_a) {
                var testData = _a[0], category = _a[1];
                return _this.faultCountProvider.getDrivingFaultSumCount(category, testData);
            })),
            etaFaults$: currentTest$.pipe(select(getTestData), select(getETA)),
            testResult$: currentTest$.pipe(select(getTestOutcome)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            emergencyStop$: currentTest$.pipe(select(getTestData), select(getEmergencyStop)),
            avoidance$: currentTest$.pipe(select(getTestData), select(getAvoidance)),
            avoidanceAttempted$: currentTest$.pipe(select(getTestData), select(getAvoidance), select(getAvoidanceAttempted)),
        };
        var _a = this.pageState, testResult$ = _a.testResult$, etaFaults$ = _a.etaFaults$, conductedLanguage$ = _a.conductedLanguage$;
        this.subscription = merge(testResult$.pipe(map(function (result) { return _this.outcome = result; })), etaFaults$.pipe(map(function (eta) {
            _this.hasPhysicalEta = eta.physical;
            _this.hasVerbalEta = eta.verbal;
        })), conductedLanguage$.pipe(tap(function (value) { return configureI18N(value, _this.translate); }))).subscribe();
    };
    DebriefCatAMod1Page.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new DebriefViewDidEnter());
    };
    DebriefCatAMod1Page.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DebriefCatAMod1Page.prototype.endDebrief = function () {
        this.store$.dispatch(new EndDebrief());
        if (this.outcome === TestOutcome.PASS) {
            this.navController.push(CAT_A_MOD1.PASS_FINALISATION_PAGE);
            return;
        }
        this.navController.push(CAT_A_MOD1.POST_DEBRIEF_HOLDING_PAGE);
    };
    DebriefCatAMod1Page = __decorate([
        IonicPage(),
        Component({
            selector: '.debrief-cat-a-mod1-page',
            templateUrl: 'debrief.cat-a-mod1.page.html',
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
    ], DebriefCatAMod1Page);
    return DebriefCatAMod1Page;
}(BasePageComponent));
export { DebriefCatAMod1Page };
//# sourceMappingURL=debrief.cat-a-mod1.page.js.map