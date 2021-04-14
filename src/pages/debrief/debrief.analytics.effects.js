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
import { AnalyticsScreenNames, } from '../../providers/analytics/analytics.model';
import { DEBRIEF_VIEW_DID_ENTER, } from '../../pages/debrief/debrief.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, isPassed } from '../../modules/tests/tests.selector';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
var DebriefAnalyticsEffects = /** @class */ (function () {
    function DebriefAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.debriefViewDidEnter$ = this.actions$.pipe(ofType(DEBRIEF_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(isPassed)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], isPassed = _a[2];
            var screenName = isPassed
                ? formatAnalyticsText(AnalyticsScreenNames.PASS_DEBRIEF, tests)
                : formatAnalyticsText(AnalyticsScreenNames.FAIL_DEBRIEF, tests);
            _this.analytics.setCurrentPage(screenName);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], DebriefAnalyticsEffects.prototype, "debriefViewDidEnter$", void 0);
    DebriefAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], DebriefAnalyticsEffects);
    return DebriefAnalyticsEffects;
}());
export { DebriefAnalyticsEffects };
//# sourceMappingURL=debrief.analytics.effects.js.map