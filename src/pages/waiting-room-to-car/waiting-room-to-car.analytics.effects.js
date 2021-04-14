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
import { WAITING_ROOM_TO_CAR_VIEW_DID_ENTER, WAITING_ROOM_TO_CAR_ERROR, WAITING_ROOM_TO_CAR_VALIDATION_ERROR, WAITING_ROOM_TO_CAR_BIKE_CATEGORY_CHANGED, WAITING_ROOM_TO_CAR_BIKE_CATEGORY_SELECTED, WAITING_ROOM_TO_CAR_VIEW_BIKE_CATEGORY_MODAL, } from '../../pages/waiting-room-to-car/waiting-room-to-car.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { getApplicationReference, } from '../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getApplicationNumber, } from '../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
var WaitingRoomToCarAnalyticsEffects = /** @class */ (function () {
    function WaitingRoomToCarAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.waitingRoomToCarViewDidEnter$ = this.actions$.pipe(ofType(WAITING_ROOM_TO_CAR_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getApplicationReference), select(getApplicationNumber)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getCandidateId)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], applicationReference = _a[2], candidateId = _a[3], category = _a[4];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, "" + candidateId);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
            _this.analytics.setCurrentPage(formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM_TO_CAR, tests));
            return of(new AnalyticRecorded());
        }));
        this.waitingRoomToCarError$ = this.actions$.pipe(ofType(WAITING_ROOM_TO_CAR_ERROR), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], category = _a[2];
            var screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM_TO_CAR, tests);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
            _this.analytics.logError(AnalyticsErrorTypes.SUBMIT_FORM_ERROR + " (" + screenName + ")", action.errorMessage);
            return of(new AnalyticRecorded());
        }));
        this.waitingRoomToCarValidationError$ = this.actions$.pipe(ofType(WAITING_ROOM_TO_CAR_VALIDATION_ERROR), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], category = _a[2];
            var screenName = formatAnalyticsText(AnalyticsScreenNames.WAITING_ROOM_TO_CAR, tests);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
            _this.analytics.logError(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + screenName + ")", action.errorMessage);
            return of(new AnalyticRecorded());
        }));
        this.waitingRoomToCarBikeCategoryChanged$ = this.actions$.pipe(ofType(WAITING_ROOM_TO_CAR_BIKE_CATEGORY_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], category = _a[2];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, action.selectedBikeCategory);
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.WAITING_ROOM_TO_CAR, tests), formatAnalyticsText(AnalyticsEvents.BIKE_CATEGORY_CHANGED, tests), "bike category changed to " + action.initialBikeCategory + " from " + action.selectedBikeCategory);
            return of(new AnalyticRecorded());
        }));
        this.waitingRoomToCarBikeCategorySelected$ = this.actions$.pipe(ofType(WAITING_ROOM_TO_CAR_BIKE_CATEGORY_SELECTED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], category = _a[2];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, action.bikeCategory);
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.WAITING_ROOM_TO_CAR, tests), formatAnalyticsText(AnalyticsEvents.BIKE_CATEGORY_SELECTED, tests), "bike category " + action.bikeCategory + " selected");
            return of(new AnalyticRecorded());
        }));
        this.waitingRoomToCarViewBikeCategoryModal$ = this.actions$.pipe(ofType(WAITING_ROOM_TO_CAR_VIEW_BIKE_CATEGORY_MODAL), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.WAITING_ROOM_TO_CAR, tests), formatAnalyticsText(AnalyticsEvents.BIKE_CATEGORY_MODAL_TRIGGERED, tests), "bike category selection modal triggered");
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], WaitingRoomToCarAnalyticsEffects.prototype, "waitingRoomToCarViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], WaitingRoomToCarAnalyticsEffects.prototype, "waitingRoomToCarError$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], WaitingRoomToCarAnalyticsEffects.prototype, "waitingRoomToCarValidationError$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], WaitingRoomToCarAnalyticsEffects.prototype, "waitingRoomToCarBikeCategoryChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], WaitingRoomToCarAnalyticsEffects.prototype, "waitingRoomToCarBikeCategorySelected$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], WaitingRoomToCarAnalyticsEffects.prototype, "waitingRoomToCarViewBikeCategoryModal$", void 0);
    WaitingRoomToCarAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], WaitingRoomToCarAnalyticsEffects);
    return WaitingRoomToCarAnalyticsEffects;
}());
export { WaitingRoomToCarAnalyticsEffects };
//# sourceMappingURL=waiting-room-to-car.analytics.effects.js.map