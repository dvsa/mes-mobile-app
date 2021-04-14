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
import { POST_DEBRIEF_HOLDING_VIEW_DID_ENTER } from './post-debrief-holding.actions';
import { concatMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { getTests } from '../../modules/tests/tests.reducer';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticsScreenNames } from '../../providers/analytics/analytics.model';
var PostDebriefHoldingAnalyticsEffects = /** @class */ (function () {
    function PostDebriefHoldingAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.postDebriefHoldingViewDidEnterEffect$ = this.actions$.pipe(ofType(POST_DEBRIEF_HOLDING_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var screenName = formatAnalyticsText(AnalyticsScreenNames.POST_DEBRIEF_HOLDING, tests);
            _this.analytics.setCurrentPage(screenName);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], PostDebriefHoldingAnalyticsEffects.prototype, "postDebriefHoldingViewDidEnterEffect$", void 0);
    PostDebriefHoldingAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], PostDebriefHoldingAnalyticsEffects);
    return PostDebriefHoldingAnalyticsEffects;
}());
export { PostDebriefHoldingAnalyticsEffects };
//# sourceMappingURL=post-debrief-holding.analytics.effects.js.map