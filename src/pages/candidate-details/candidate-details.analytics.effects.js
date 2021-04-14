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
import { AnalyticsDimensionIndices, AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, } from '../../providers/analytics/analytics.model';
import { isCandidateSpecialNeeds, getCandidateId, isCandidateCheckNeeded, } from './candidate-details.selector';
import { CANDIDATE_DETAILS_VIEW_DID_ENTER, CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED, } from './candidate-details.actions';
var CandidateDetailsAnalyticsEffects = /** @class */ (function () {
    function CandidateDetailsAnalyticsEffects(analytics, actions$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.candidateView$ = this.actions$.pipe(ofType(CANDIDATE_DETAILS_VIEW_DID_ENTER), switchMap(function (action) {
            var specNeeds = isCandidateSpecialNeeds(action.slot);
            var candidateCheck = isCandidateCheckNeeded(action.slot);
            var candidateId = getCandidateId(action.slot);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, candidateId);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_SPECIAL_NEEDS, specNeeds ? '1' : '0');
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_WITH_CHECK, candidateCheck ? '1' : '0');
            _this.analytics.setCurrentPage(AnalyticsScreenNames.CANDIDATE_DETAILS);
            return of();
        }));
        this.slotChangeViewed$ = this.actions$.pipe(ofType(CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED), switchMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.SLOT_CHANGE_VIEWED, action.slotId.toString());
            return of();
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], CandidateDetailsAnalyticsEffects.prototype, "candidateView$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], CandidateDetailsAnalyticsEffects.prototype, "slotChangeViewed$", void 0);
    CandidateDetailsAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions])
    ], CandidateDetailsAnalyticsEffects);
    return CandidateDetailsAnalyticsEffects;
}());
export { CandidateDetailsAnalyticsEffects };
//# sourceMappingURL=candidate-details.analytics.effects.js.map