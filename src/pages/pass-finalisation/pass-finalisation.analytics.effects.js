var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticsScreenNames, AnalyticsErrorTypes, AnalyticsEventCategories, AnalyticsEvents, } from '../../providers/analytics/analytics.model';
import { PASS_FINALISTATION_VIEW_DID_ENTER, PASS_FINALISTATION_VALIDATION_ERROR, } from './pass-finalisation.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded, AnalyticNotRecorded } from '../../providers/analytics/analytics.actions';
import * as passCompletionActions from '../../modules/tests/pass-completion/pass-completion.actions';
import * as testSummaryActions from '../../modules/tests/test-summary/common/test-summary.actions';
import * as vehicleDetailsActions from '../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { getActivityCode } from '../../modules/tests/activity-code/activity-code.reducer';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import * as commsActions from '../../modules/tests/communication-preferences/communication-preferences.actions';
import { Language } from '../../modules/tests/communication-preferences/communication-preferences.model';
var PassFinalisationAnalyticsEffects = /** @class */ (function () {
    function PassFinalisationAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.passFinalisationViewDidEnter$ = this.actions$.pipe(ofType(PASS_FINALISTATION_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var screenName = formatAnalyticsText(AnalyticsScreenNames.PASS_FINALISATION, tests);
            _this.analytics.setCurrentPage(screenName);
            return of(new AnalyticRecorded());
        }));
        this.validationErrorEffect$ = this.actions$.pipe(ofType(PASS_FINALISTATION_VALIDATION_ERROR), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var formattedScreenName = formatAnalyticsText(AnalyticsScreenNames.PASS_FINALISATION, tests);
            _this.analytics.logError(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + formattedScreenName + ")", action.errorMessage);
            return of(new AnalyticRecorded());
        }));
        this.code78PresentEffect$ = this.actions$.pipe(ofType(passCompletionActions.CODE_78_PRESENT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_CODE_78, tests), 'Yes');
            return of(new AnalyticRecorded());
        }));
        this.code78NotPresentEffect$ = this.actions$.pipe(ofType(passCompletionActions.CODE_78_NOT_PRESENT), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_CODE_78, tests), 'No');
            return of(new AnalyticRecorded());
        }));
        this.provisionalLicenseNotReceived$ = this.actions$.pipe(ofType(passCompletionActions.PROVISIONAL_LICENSE_NOT_RECEIVED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LICENSE_RECEIVED, tests), 'No');
            return of(new AnalyticRecorded());
        }));
        this.provisionalLicenseReceived$ = this.actions$.pipe(ofType(passCompletionActions.PROVISIONAL_LICENSE_RECEIVED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.TOGGLE_LICENSE_RECEIVED, tests), 'Yes');
            return of(new AnalyticRecorded());
        }));
        this.transmissionChanged$ = this.actions$.pipe(ofType(vehicleDetailsActions.GEARBOX_CATEGORY_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getActivityCode)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], activityCode = _a[2];
            if (activityCode != null) {
                _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.GEARBOX_CATEGORY_CHANGED, tests), action.gearboxCategory);
                return of(new AnalyticRecorded());
            }
            return of(new AnalyticNotRecorded());
        }));
        this.d255Yes$ = this.actions$.pipe(ofType(testSummaryActions.D255_YES), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.D255, tests), 'Yes');
            return of(new AnalyticRecorded());
        }));
        this.d255No$ = this.actions$.pipe(ofType(testSummaryActions.D255_NO), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.D255, tests), 'No');
            return of(new AnalyticRecorded());
        }));
        this.candidateChoseToProccedWithTestInEnglish$ = this.actions$.pipe(ofType(commsActions.CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_ENGLISH), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getActivityCode)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], activityCode = _a[2];
            if (activityCode !== null) {
                _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.LANGUAGE_CHANGED, tests), Language.ENGLISH);
                return of(new AnalyticRecorded());
            }
            return of(new AnalyticNotRecorded());
        }));
        this.candidateChoseToProccedWithTestInWelsh$ = this.actions$.pipe(ofType(commsActions.CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_WELSH), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getActivityCode)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], activityCode = _a[2];
            if (activityCode !== null) {
                _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.LANGUAGE_CHANGED, tests), Language.CYMRAEG);
                return of(new AnalyticRecorded());
            }
            return of(new AnalyticNotRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "passFinalisationViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "validationErrorEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "code78PresentEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "code78NotPresentEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "provisionalLicenseNotReceived$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "provisionalLicenseReceived$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "transmissionChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "d255Yes$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "d255No$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "candidateChoseToProccedWithTestInEnglish$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PassFinalisationAnalyticsEffects.prototype, "candidateChoseToProccedWithTestInWelsh$", void 0);
    PassFinalisationAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], PassFinalisationAnalyticsEffects);
    return PassFinalisationAnalyticsEffects;
}());
export { PassFinalisationAnalyticsEffects };
//# sourceMappingURL=pass-finalisation.analytics.effects.js.map