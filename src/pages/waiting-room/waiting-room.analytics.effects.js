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
import { AnalyticsScreenNames, AnalyticsDimensionIndices, AnalyticsErrorTypes, AnalyticsEvents, AnalyticsEventCategories, } from '../../providers/analytics/analytics.model';
import { WAITING_ROOM_VIEW_DID_ENTER, WAITING_ROOM_VALIDATION_ERROR, } from '../../pages/waiting-room/waiting-room.actions';
import { CBT_NUMBER_CHANGED, } from '../../modules/tests/pre-test-declarations/cat-a/pre-test-declarations.cat-a.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { getApplicationReference, } from '../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getApplicationNumber, } from '../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
var WaitingRoomAnalyticsEffects = /** @class */ (function () {
    function WaitingRoomAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.waitingRoomViewDidEnter$ = this.actions$.pipe(ofType(WAITING_ROOM_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getApplicationReference), select(getApplicationNumber)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getCandidateId)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], applicationReference = _a[2], candidateId = _a[3], category = _a[4];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, "" + candidateId);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
            _this.analytics.setCurrentPage(formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM, tests));
            return of(new AnalyticRecorded());
        }));
        this.waitingRoomValidationError$ = this.actions$.pipe(ofType(WAITING_ROOM_VALIDATION_ERROR), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], category = _a[2];
            var screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM, tests);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
            _this.analytics.logError(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + screenName + ")", action.errorMessage);
            return of(new AnalyticRecorded());
        }));
        this.cbtNumberChanged$ = this.actions$.pipe(ofType(CBT_NUMBER_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.WAITING_ROOM, tests), formatAnalyticsText(AnalyticsEvents.CBT_CHANGED, tests));
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], WaitingRoomAnalyticsEffects.prototype, "waitingRoomViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], WaitingRoomAnalyticsEffects.prototype, "waitingRoomValidationError$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], WaitingRoomAnalyticsEffects.prototype, "cbtNumberChanged$", void 0);
    WaitingRoomAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], WaitingRoomAnalyticsEffects);
    return WaitingRoomAnalyticsEffects;
}());
export { WaitingRoomAnalyticsEffects };
//# sourceMappingURL=waiting-room.analytics.effects.js.map