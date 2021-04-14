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
import { VEHICLE_CHECKS_VIEW_DID_ENTER, } from './vehicle-checks-modal.cat-a-mod2.actions';
import { concatMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsEventCategories, AnalyticsScreenNames, } from '../../../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../../../providers/analytics/analytics.actions';
import { AnalyticsProvider } from '../../../../../providers/analytics/analytics';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../../../../shared/helpers/format-analytics-text';
import { SAFETY_QUESTION_OUTCOME_CHANGED, SAFETY_QUESTION_SELECTED, BALANCE_QUESTION_OUTCOME_CHANGED, BALANCE_QUESTION_SELECTED, } from '../../../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.actions';
var VehicleChecksModalCatAMod2AnalyticsEffects = /** @class */ (function () {
    function VehicleChecksModalCatAMod2AnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.vehicleChecksModalViewDidEnter$ = this.actions$.pipe(ofType(VEHICLE_CHECKS_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            _this.analytics.setCurrentPage(formatAnalyticsText(AnalyticsScreenNames.VEHICLE_CHECKS, tests));
            return of(new AnalyticRecorded());
        }));
        this.safetyQuestionChanged$ = this.actions$.pipe(ofType(SAFETY_QUESTION_SELECTED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var eventText = "safety question " + (action.index + 1) + " changed";
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests), eventText, action.safetyQuestion.code);
            return of(new AnalyticRecorded());
        }));
        this.safetyQuestionOutcomeChanged$ = this.actions$.pipe(ofType(SAFETY_QUESTION_OUTCOME_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var eventText = "safety question " + (action.index + 1) + " outcome changed";
            var outComeText = action.safetyQuestionOutcome === 'P' ? 'correct' : 'driving fault';
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests), eventText, outComeText);
            return of(new AnalyticRecorded());
        }));
        this.balanceQuestionChanged$ = this.actions$.pipe(ofType(BALANCE_QUESTION_SELECTED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var eventText = "balance question " + (action.index + 1) + " changed";
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests), eventText, action.balanceQuestion.code);
            return of(new AnalyticRecorded());
        }));
        this.balanceQuestionOutcomeChanged$ = this.actions$.pipe(ofType(BALANCE_QUESTION_OUTCOME_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var eventText = "balance question " + (action.index + 1) + " outcome changed";
            var outComeText = action.balanceQuestionOutcome === 'P' ? 'correct' : 'driving fault';
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests), eventText, outComeText);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatAMod2AnalyticsEffects.prototype, "vehicleChecksModalViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatAMod2AnalyticsEffects.prototype, "safetyQuestionChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatAMod2AnalyticsEffects.prototype, "safetyQuestionOutcomeChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatAMod2AnalyticsEffects.prototype, "balanceQuestionChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], VehicleChecksModalCatAMod2AnalyticsEffects.prototype, "balanceQuestionOutcomeChanged$", void 0);
    VehicleChecksModalCatAMod2AnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], VehicleChecksModalCatAMod2AnalyticsEffects);
    return VehicleChecksModalCatAMod2AnalyticsEffects;
}());
export { VehicleChecksModalCatAMod2AnalyticsEffects };
//# sourceMappingURL=vehicle-checks-modal.cat-a-mod2.analytics.effects.js.map