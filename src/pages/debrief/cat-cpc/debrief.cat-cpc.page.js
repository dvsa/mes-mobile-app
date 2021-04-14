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
import { map, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from '@ngx-translate/core';
import { getCommunicationPreference, } from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getCandidate } from '../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTestOutcome } from '../debrief.selector';
import { getQuestion1, getQuestion2, getQuestion3, getQuestion4, getQuestion5, getTotalPercent, } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { CAT_CPC } from '../../page-names.constants';
import { TestOutcome as OutcomeType } from '../../../modules/tests/tests.constants';
import { TestOutcome } from '../../../shared/models/test-outcome';
var DebriefCatCPCPage = /** @class */ (function (_super) {
    __extends(DebriefCatCPCPage, _super);
    function DebriefCatCPCPage(store$, navController, navParams, platform, authenticationProvider, screenOrientation, insomnia, translate) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        _this.translate = translate;
        return _this;
    }
    DebriefCatCPCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            conductedLanguage$: currentTest$.pipe(select(getCommunicationPreference), select(getConductedLanguage)),
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            testResult$: currentTest$.pipe(select(getTestOutcome)),
            question1$: currentTest$.pipe(select(getTestData), select(getQuestion1)),
            question2$: currentTest$.pipe(select(getTestData), select(getQuestion2)),
            question3$: currentTest$.pipe(select(getTestData), select(getQuestion3)),
            question4$: currentTest$.pipe(select(getTestData), select(getQuestion4)),
            question5$: currentTest$.pipe(select(getTestData), select(getQuestion5)),
            overallScore$: currentTest$.pipe(select(getTestData), select(getTotalPercent)),
        };
        var _a = this.pageState, testResult$ = _a.testResult$, conductedLanguage$ = _a.conductedLanguage$;
        this.subscription = merge(testResult$.pipe(map(function (result) { return _this.outcome = result; })), conductedLanguage$.pipe(tap(function (value) { return configureI18N(value, _this.translate); }))).subscribe();
    };
    DebriefCatCPCPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new DebriefViewDidEnter());
    };
    DebriefCatCPCPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DebriefCatCPCPage.prototype.isTerminated = function () {
        return this.outcome === OutcomeType.Terminated;
    };
    DebriefCatCPCPage.prototype.endDebrief = function () {
        this.store$.dispatch(new EndDebrief());
        if (this.outcome === TestOutcome.PASS) {
            this.navController.push(CAT_CPC.PASS_FINALISATION_PAGE);
            return;
        }
        this.navController.push(CAT_CPC.POST_DEBRIEF_HOLDING_PAGE);
    };
    DebriefCatCPCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.debrief-cat-cpc-page',
            templateUrl: 'debrief.cat-cpc.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            ScreenOrientation,
            Insomnia,
            TranslateService])
    ], DebriefCatCPCPage);
    return DebriefCatCPCPage;
}(BasePageComponent));
export { DebriefCatCPCPage };
//# sourceMappingURL=debrief.cat-cpc.page.js.map