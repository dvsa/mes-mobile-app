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
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticsScreenNames, } from '../../providers/analytics/analytics.model';
import { DASHBOARD_VIEW_DID_ENTER, } from './dashboard.actions';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
var DashboardAnalyticsEffects = /** @class */ (function () {
    function DashboardAnalyticsEffects(analytics, actions$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.dashboardViewDidEnter$ = this.actions$.pipe(ofType(DASHBOARD_VIEW_DID_ENTER), switchMap(function (action) {
            _this.analytics.setCurrentPage(AnalyticsScreenNames.DASHBOARD);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], DashboardAnalyticsEffects.prototype, "dashboardViewDidEnter$", void 0);
    DashboardAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions])
    ], DashboardAnalyticsEffects);
    return DashboardAnalyticsEffects;
}());
export { DashboardAnalyticsEffects };
//# sourceMappingURL=dashboard.analytics.effects.js.map