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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { DebriefViewDidEnter, EndDebrief } from '../debrief.actions';
import { merge } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestData } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { getETA, getEco } from '../../../modules/tests/test-data/common/test-data.selector';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Component } from '@angular/core';
import { getTestOutcome } from '../debrief.selector';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from '@ngx-translate/core';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { CAT_C } from '../../page-names.constants';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { getCandidate } from '../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { TestOutcome } from '../../../shared/models/test-outcome';
import { getVehicleChecks } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
var DebriefCatCPage = /** @class */ (function (_super) {
    __extends(DebriefCatCPage, _super);
    function DebriefCatCPage(store$, navController, navParams, platform, authenticationProvider, screenOrientation, insomnia, translate, faultCountProvider, faultSummaryProvider) {
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
        _this.hasPhysicalEta = false;
        _this.hasVerbalEta = false;
        _this.adviceGivenControl = false;
        _this.adviceGivenPlanning = false;
        return _this;
    }
    DebriefCatCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category$ = currentTest$.pipe(select(getTestCategory));
        this.pageState = {
            seriousFaults$: currentTest$.pipe(select(getTestData), withLatestFrom(category$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.faultSummaryProvider.getSeriousFaultsList(data, category)
                    .map(function (fault) { return fault.competencyIdentifier; });
            })),
            dangerousFaults$: currentTest$.pipe(select(getTestData), withLatestFrom(category$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.faultSummaryProvider.getDangerousFaultsList(data, category)
                    .map(function (fault) { return fault.competencyIdentifier; });
            })),
            drivingFaults$: currentTest$.pipe(select(getTestData), withLatestFrom(category$), map(function (_a) {
                var data = _a[0], category = _a[1];
                return _this.faultSummaryProvider.getDrivingFaultsList(data, category);
            })),
            drivingFaultCount$: currentTest$.pipe(select(getTestData), withLatestFrom(category$), map(function (_a) {
                var testData = _a[0], category = _a[1];
                return _this.faultCountProvider.getDrivingFaultSumCount(category, testData);
            })),
            etaFaults$: currentTest$.pipe(select(getTestData), select(getETA)),
            ecoFaults$: currentTest$.pipe(select(getTestData), select(getEco)),
            testResult$: currentTest$.pipe(select(getTestOutcome)),
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            category$: currentTest$.pipe(select(getTestCategory)),
            tellMeShowMeQuestions$: currentTest$.pipe(select(getTestData), select(getVehicleChecks), map(function (checks) { return __spreadArray(__spreadArray([], checks.tellMeQuestions), checks.showMeQuestions); }), map(function (checks) { return checks.filter(function (c) { return c.code !== undefined; }); })),
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
    DebriefCatCPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new DebriefViewDidEnter());
    };
    DebriefCatCPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DebriefCatCPage.prototype.endDebrief = function () {
        this.store$.dispatch(new EndDebrief());
        if (this.outcome === TestOutcome.PASS) {
            this.navController.push(CAT_C.PASS_FINALISATION_PAGE);
            return;
        }
        this.navController.push(CAT_C.POST_DEBRIEF_HOLDING_PAGE);
    };
    DebriefCatCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.debrief-cat-c-page',
            templateUrl: 'debrief.cat-c.page.html',
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
    ], DebriefCatCPage);
    return DebriefCatCPage;
}(BasePageComponent));
export { DebriefCatCPage };
//# sourceMappingURL=debrief.cat-c.page.js.map