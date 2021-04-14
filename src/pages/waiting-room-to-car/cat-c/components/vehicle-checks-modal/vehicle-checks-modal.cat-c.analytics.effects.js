var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { VEHICLE_CHECKS_VIEW_DID_ENTER, } from './vehicle-checks-modal.cat-c.actions';
import { concatMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsEventCategories, AnalyticsScreenNames, } from '../../../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../../../providers/analytics/analytics.actions';
import { AnalyticsProvider } from '../../../../../providers/analytics/analytics';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../../../../shared/helpers/format-analytics-text';
import { SHOW_ME_QUESTION_OUTCOME_CHANGED, SHOW_ME_QUESTION_SELECTED, TELL_ME_QUESTION_OUTCOME_CHANGED, TELL_ME_QUESTION_SELECTED, } from '../../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
var VehicleChecksModalCatCAnalyticsEffects = /** @class */ (function () {
    function VehicleChecksModalCatCAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.vehicleChecksModalViewDidEnter$ = this.actions$.pipe(ofType(VEHICLE_CHECKS_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.setCurrentPage(formatAnalyticsText(AnalyticsScreenNames.VEHICLE_CHECKS, tests));
            return of(new AnalyticRecorded());
        }));
        this.showMeQuestionChanged$ = this.actions$.pipe(ofType(SHOW_ME_QUESTION_SELECTED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var eventText = "show me question " + (action.index + 1) + " changed";
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests), eventText, action.showMeQuestion.code);
            return of(new AnalyticRecorded());
        }));
        this.showMeQuestionOutComeChanged$ = this.actions$.pipe(ofType(SHOW_ME_QUESTION_OUTCOME_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var eventText = "show me question " + (action.index + 1) + " outcome changed";
            var outComeText = action.showMeQuestionOutcome === 'P' ? 'correct' : 'driving fault';
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests), eventText, outComeText);
            return of(new AnalyticRecorded());
        }));
        this.tellMeQuestionChanged$ = this.actions$.pipe(ofType(TELL_ME_QUESTION_SELECTED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var eventText = "tell me question " + (action.index + 1) + " changed";
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests), eventText, action.tellMeQuestion.code);
            return of(new AnalyticRecorded());
        }));
        this.tellMeQuestionOutComeChanged$ = this.actions$.pipe(ofType(TELL_ME_QUESTION_OUTCOME_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var eventText = "tell me question " + (action.index + 1) + " outcome changed";
            var outComeText = action.tellMeQuestionOutcome === 'P' ? 'correct' : 'driving fault';
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests), eventText, outComeText);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatCAnalyticsEffects.prototype, "vehicleChecksModalViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatCAnalyticsEffects.prototype, "showMeQuestionChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatCAnalyticsEffects.prototype, "showMeQuestionOutComeChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatCAnalyticsEffects.prototype, "tellMeQuestionChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatCAnalyticsEffects.prototype, "tellMeQuestionOutComeChanged$", void 0);
    VehicleChecksModalCatCAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], VehicleChecksModalCatCAnalyticsEffects);
    return VehicleChecksModalCatCAnalyticsEffects;
}());
export { VehicleChecksModalCatCAnalyticsEffects };
//# sourceMappingURL=vehicle-checks-modal.cat-c.analytics.effects.js.map