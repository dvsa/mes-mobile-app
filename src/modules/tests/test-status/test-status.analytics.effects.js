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
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import * as testStatusActions from './test-status.actions';
import { concatMap } from 'rxjs/operators';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { of } from 'rxjs';
import { AnalyticsEventCategories, AnalyticsEvents } from '../../../providers/analytics/analytics.model';
var TestStatusAnalyticsEffects = /** @class */ (function () {
    function TestStatusAnalyticsEffects(analytics, actions$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.setTestStatusDecidedEffect$ = this.actions$.pipe(ofType(testStatusActions.SET_TEST_STATUS_DECIDED), concatMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.TEST_LIFECYCLE, AnalyticsEvents.TEST_DECIDED);
            return of(new AnalyticRecorded());
        }));
        this.setTestStatusWriteUpEffect$ = this.actions$.pipe(ofType(testStatusActions.SET_TEST_STATUS_WRITE_UP), concatMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.TEST_LIFECYCLE, AnalyticsEvents.TEST_IN_WRITE_UP);
            return of(new AnalyticRecorded());
        }));
        this.setTestStatusAutosavedEffect$ = this.actions$.pipe(ofType(testStatusActions.SET_TEST_STATUS_AUTOSAVED), concatMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.TEST_LIFECYCLE, AnalyticsEvents.TEST_AUTOSAVED);
            return of(new AnalyticRecorded());
        }));
        this.setTestStatusSubmittedEffect$ = this.actions$.pipe(ofType(testStatusActions.SET_TEST_STATUS_SUBMITTED), concatMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.TEST_LIFECYCLE, AnalyticsEvents.TEST_SUBMITTED);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestStatusAnalyticsEffects.prototype, "setTestStatusDecidedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestStatusAnalyticsEffects.prototype, "setTestStatusWriteUpEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestStatusAnalyticsEffects.prototype, "setTestStatusAutosavedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestStatusAnalyticsEffects.prototype, "setTestStatusSubmittedEffect$", void 0);
    TestStatusAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions])
    ], TestStatusAnalyticsEffects);
    return TestStatusAnalyticsEffects;
}());
export { TestStatusAnalyticsEffects };
//# sourceMappingURL=test-status.analytics.effects.js.map