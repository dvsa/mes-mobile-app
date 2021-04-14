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
import { AnalyticsScreenNames, AnalyticsErrorTypes, } from '../../providers/analytics/analytics.model';
import * as healthDeclarationActions from './health-declaration.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
var HealthDeclarationAnalyticsEffects = /** @class */ (function () {
    function HealthDeclarationAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.healthDeclarationViewDidEnter$ = this.actions$.pipe(ofType(healthDeclarationActions.HEALTH_DECLARATION_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var screenName = formatAnalyticsText(AnalyticsScreenNames.HEALTH_DECLARATION, tests);
            _this.analytics.setCurrentPage(screenName);
            return of(new AnalyticRecorded());
        }));
        this.validationErrorEffect$ = this.actions$.pipe(ofType(healthDeclarationActions.HEALTH_DECLARATION_VALIDATION_ERROR), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var formattedScreenName = formatAnalyticsText(AnalyticsScreenNames.HEALTH_DECLARATION, tests);
            _this.analytics.logError(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + formattedScreenName + ")", action.errorMessage);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], HealthDeclarationAnalyticsEffects.prototype, "healthDeclarationViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], HealthDeclarationAnalyticsEffects.prototype, "validationErrorEffect$", void 0);
    HealthDeclarationAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], HealthDeclarationAnalyticsEffects);
    return HealthDeclarationAnalyticsEffects;
}());
export { HealthDeclarationAnalyticsEffects };
//# sourceMappingURL=health-declaration.analytics.effects.js.map