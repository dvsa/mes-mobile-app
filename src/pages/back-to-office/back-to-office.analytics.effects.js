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
import { AnalyticsScreenNames, AnalyticsDimensionIndices, AnalyticsEventCategories, AnalyticsEvents, } from '../../providers/analytics/analytics.model';
import { BACK_TO_OFFICE_VIEW_DID_ENTER, DEFER_WRITE_UP, } from './back-to-office.actions';
import { Store, select } from '@ngrx/store';
import { getCurrentTest, isPassed, getJournalData } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getApplicationReference, } from '../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getApplicationNumber, } from '../../modules/tests/journal-data/common/application-reference/application-reference.selector';
var BackToOfficeAnalyticsEffects = /** @class */ (function () {
    function BackToOfficeAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.backToOfficeViewDidEnter$ = this.actions$.pipe(ofType(BACK_TO_OFFICE_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var screenName = formatAnalyticsText(AnalyticsScreenNames.BACK_TO_OFFICE, tests);
            _this.analytics.setCurrentPage(screenName);
            return of(new AnalyticRecorded());
        }));
        this.deferWriteUpEffect$ = this.actions$.pipe(ofType(DEFER_WRITE_UP), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(isPassed)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getCandidateId)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getApplicationReference), select(getApplicationNumber)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], isPassed = _a[2], candidateId = _a[3], applicationReference = _a[4];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, "" + candidateId);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.BACK_TO_OFFICE, tests), formatAnalyticsText(AnalyticsEvents.DEFER_WRITE_UP, tests), isPassed ? 'pass' : 'fail');
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], BackToOfficeAnalyticsEffects.prototype, "backToOfficeViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], BackToOfficeAnalyticsEffects.prototype, "deferWriteUpEffect$", void 0);
    BackToOfficeAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], BackToOfficeAnalyticsEffects);
    return BackToOfficeAnalyticsEffects;
}());
export { BackToOfficeAnalyticsEffects };
//# sourceMappingURL=back-to-office.analytics.effects.js.map