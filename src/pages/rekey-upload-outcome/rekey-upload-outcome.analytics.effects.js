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
import { AnalyticsScreenNames } from '../../providers/analytics/analytics.model';
import { REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER, } from './rekey-upload-outcome.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
var RekeyUploadOutcomeAnalyticsEffects = /** @class */ (function () {
    function RekeyUploadOutcomeAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.rekeyUploadedViewDidEnter$ = this.actions$.pipe(ofType(REKEY_UPLOAD_OUTCOME_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1];
            var screenName = formatAnalyticsText(AnalyticsScreenNames.REKEY_UPLOADED, tests);
            _this.analytics.setCurrentPage(screenName);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], RekeyUploadOutcomeAnalyticsEffects.prototype, "rekeyUploadedViewDidEnter$", void 0);
    RekeyUploadOutcomeAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], RekeyUploadOutcomeAnalyticsEffects);
    return RekeyUploadOutcomeAnalyticsEffects;
}());
export { RekeyUploadOutcomeAnalyticsEffects };
//# sourceMappingURL=rekey-upload-outcome.analytics.effects.js.map