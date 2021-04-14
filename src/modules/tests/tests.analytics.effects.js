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
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { SET_TEST_STATUS_SUBMITTED } from './test-status/test-status.actions';
import { withLatestFrom, switchMap, concatMap } from 'rxjs/operators';
import { getTests } from './tests.reducer';
import { AnalyticsEventCategories, AnalyticsEvents, AnalyticsDimensionIndices, } from '../../providers/analytics/analytics.model';
import { getTestById, isPassed, getCurrentTest } from './tests.selector';
import { SEND_COMPLETED_TESTS_FAILURE, TEST_OUTCOME_CHANGED, START_TEST, SEND_PARTIAL_TESTS_FAILURE, } from './tests.actions';
import { of } from 'rxjs';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { formatApplicationReference } from '../../shared/helpers/formatters';
import { NavigationStateProvider } from '../../providers/navigation-state/navigation-state';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
var TestsAnalyticsEffects = /** @class */ (function () {
    function TestsAnalyticsEffects(analytics, actions$, store$, navigationStateProvider) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.navigationStateProvider = navigationStateProvider;
        this.setTestStatusSubmittedEffect$ = this.actions$.pipe(ofType(SET_TEST_STATUS_SUBMITTED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var test = getTestById(tests, action.slotId);
            var isTestPassed = isPassed(test);
            var isRekey = test.rekey;
            var journalDataOfTest = test.journalData;
            _this.analytics.logEvent(AnalyticsEventCategories.POST_TEST, isRekey ? AnalyticsEvents.SUBMIT_REKEY_TEST : AnalyticsEvents.SUBMIT_TEST, isTestPassed ? 'pass' : 'fail');
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, formatApplicationReference(journalDataOfTest.applicationReference));
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, journalDataOfTest.candidate.candidateId ? journalDataOfTest.candidate.candidateId.toString() : null);
            return of(new AnalyticRecorded());
        }));
        this.sendCompletedTestsFailureEffect$ = this.actions$.pipe(ofType(SEND_COMPLETED_TESTS_FAILURE), switchMap(function (action) {
            _this.analytics.logError('Error connecting to microservice (test submission)', 'No message');
            return of(new AnalyticRecorded());
        }));
        this.sendPartialTestsFailureEffect$ = this.actions$.pipe(ofType(SEND_PARTIAL_TESTS_FAILURE), switchMap(function (action) {
            _this.analytics.logError('Error connecting to microservice (partial test submission)', 'No message');
            return of(new AnalyticRecorded());
        }));
        this.testOutcomeChangedEffect$ = this.actions$.pipe(ofType(TEST_OUTCOME_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var test = getCurrentTest(tests);
            var journalDataOfTest = test.journalData;
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests), formatAnalyticsText(AnalyticsEvents.TEST_OUTCOME_CHANGED, tests), action.payload);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, formatApplicationReference(journalDataOfTest.applicationReference));
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, journalDataOfTest.candidate.candidateId.toString());
            return of(new AnalyticRecorded());
        }));
        this.startTestAnalyticsEffect$ = this.actions$.pipe(ofType(START_TEST), switchMap(function (action) {
            var category = _this.navigationStateProvider.isRekeySearch() ?
                AnalyticsEventCategories.REKEY_SEARCH :
                AnalyticsEventCategories.JOURNAL;
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, action.category);
            _this.analytics.logEvent(category, AnalyticsEvents.START_TEST);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsAnalyticsEffects.prototype, "setTestStatusSubmittedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsAnalyticsEffects.prototype, "sendCompletedTestsFailureEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsAnalyticsEffects.prototype, "sendPartialTestsFailureEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsAnalyticsEffects.prototype, "testOutcomeChangedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestsAnalyticsEffects.prototype, "startTestAnalyticsEffect$", void 0);
    TestsAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store,
            NavigationStateProvider])
    ], TestsAnalyticsEffects);
    return TestsAnalyticsEffects;
}());
export { TestsAnalyticsEffects };
//# sourceMappingURL=tests.analytics.effects.js.map