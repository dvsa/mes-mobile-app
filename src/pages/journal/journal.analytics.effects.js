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
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { JOURNAL_VIEW_DID_ENTER, JOURNAL_NAVIGATE_DAY, JOURNAL_REFRESH, JOURNAL_REFRESH_ERROR, RESUMING_WRITE_UP, EARLY_START_MODAL_DID_ENTER, EARLY_START_MODAL_CONTINUE_TO_TEST, EARLY_START_MODAL_RETURN_TO_JOURNAL, } from '../../modules/journal/journal.actions';
import { AnalyticsDimensionIndices, AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, } from '../../providers/analytics/analytics.model';
import { SLOT_HAS_CHANGED } from '../../providers/slot/slot.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getTestById, isPassed } from '../../modules/tests/tests.selector';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { formatApplicationReference } from '../../shared/helpers/formatters';
var JournalAnalyticsEffects = /** @class */ (function () {
    function JournalAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.journalView$ = this.actions$.pipe(ofType(JOURNAL_VIEW_DID_ENTER), switchMap(function () {
            _this.analytics.setCurrentPage(AnalyticsScreenNames.JOURNAL);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, '');
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '');
            return of(new AnalyticRecorded());
        }));
        this.journalNavigation$ = this.actions$.pipe(ofType(JOURNAL_NAVIGATE_DAY), switchMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.NAVIGATION, _this.analytics.getDescriptiveDate(action.day));
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.JOURNAL_DAYS_FROM_TODAY, _this.analytics.getDiffDays(action.day).toString());
            return of(new AnalyticRecorded());
        }));
        this.journalRefresh$ = this.actions$.pipe(ofType(JOURNAL_REFRESH), switchMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.REFRESH_JOURNAL, action.mode);
            return of(new AnalyticRecorded());
        }));
        this.earlyStartModalDidEnter$ = this.actions$.pipe(ofType(EARLY_START_MODAL_DID_ENTER), switchMap(function () {
            _this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.DISPLAY_EARLY_START_MODAL);
            return of(new AnalyticRecorded());
        }));
        this.earlyStartModalContinue$ = this.actions$.pipe(ofType(EARLY_START_MODAL_CONTINUE_TO_TEST), switchMap(function () {
            _this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.EXIT_EARLY_START_MODAL_CONTINUE);
            return of(new AnalyticRecorded());
        }));
        this.earlyStartModalReturn$ = this.actions$.pipe(ofType(EARLY_START_MODAL_RETURN_TO_JOURNAL), switchMap(function () {
            _this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.EXIT_EARLY_START_MODAL_RETURN);
            return of(new AnalyticRecorded());
        }));
        this.journalRefreshError$ = this.actions$.pipe(ofType(JOURNAL_REFRESH_ERROR), switchMap(function (action) {
            _this.analytics.logError(action.errorDescription, action.errorMessage);
            return of(new AnalyticRecorded());
        }));
        this.slotChanged$ = this.actions$.pipe(ofType(SLOT_HAS_CHANGED), switchMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.SLOT_CHANGED, action.slotId.toString());
            return of(new AnalyticRecorded());
        }));
        this.resumingWriteUpEffect$ = this.actions$.pipe(ofType(RESUMING_WRITE_UP), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var setTestStatusSubmittedAction = action;
            var test = getTestById(tests, setTestStatusSubmittedAction.slotId);
            var isTestPassed = isPassed(test);
            var journalDataOfTest = test.journalData;
            _this.analytics.logEvent(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.RESUME_WRITE_UP, isTestPassed ? 'pass' : 'fail');
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, formatApplicationReference(journalDataOfTest.applicationReference));
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, journalDataOfTest.candidate.candidateId.toString());
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalAnalyticsEffects.prototype, "journalView$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalAnalyticsEffects.prototype, "journalNavigation$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalAnalyticsEffects.prototype, "journalRefresh$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalAnalyticsEffects.prototype, "earlyStartModalDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalAnalyticsEffects.prototype, "earlyStartModalContinue$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalAnalyticsEffects.prototype, "earlyStartModalReturn$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalAnalyticsEffects.prototype, "journalRefreshError$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalAnalyticsEffects.prototype, "slotChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalAnalyticsEffects.prototype, "resumingWriteUpEffect$", void 0);
    JournalAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], JournalAnalyticsEffects);
    return JournalAnalyticsEffects;
}());
export { JournalAnalyticsEffects };
//# sourceMappingURL=journal.analytics.effects.js.map