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
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { TEST_RESULT_SEARCH_VIEW_DID_ENTER, PERFORM_APPLICATION_REFERENCE_SEARCH, PERFORM_DRIVER_NUMBER_SEARCH, PERFORM_LDTM_SEARCH, } from './test-results-search.actions';
import { AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, } from '../../providers/analytics/analytics.model';
var TestResultsSearchAnalyticsEffects = /** @class */ (function () {
    function TestResultsSearchAnalyticsEffects(analytics, actions$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.testResultSearchViewDidEnter$ = this.actions$.pipe(ofType(TEST_RESULT_SEARCH_VIEW_DID_ENTER), switchMap(function (action) {
            _this.analytics.setCurrentPage(AnalyticsScreenNames.TEST_RESULTS_SEARCH);
            return of(new AnalyticRecorded());
        }));
        this.performApplicationReferenceSearch$ = this.actions$.pipe(ofType(PERFORM_APPLICATION_REFERENCE_SEARCH), switchMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.TEST_RESULTS_SEARCH, AnalyticsEvents.APPLICATION_REFERENCE_SEARCH);
            return of(new AnalyticRecorded());
        }));
        this.performDriverNumberSearch$ = this.actions$.pipe(ofType(PERFORM_DRIVER_NUMBER_SEARCH), switchMap(function (action) {
            _this.analytics.logEvent(AnalyticsEventCategories.TEST_RESULTS_SEARCH, AnalyticsEvents.DRIVER_NUMBER_SEARCH);
            return of(new AnalyticRecorded());
        }));
        this.performLDTMSearch$ = this.actions$.pipe(ofType(PERFORM_LDTM_SEARCH), switchMap(function (action) {
            var searchParametersUsed = [];
            var label = '';
            if (action.advancedSearchParams.startDate || action.advancedSearchParams.endDate) {
                searchParametersUsed.push('date');
            }
            if (action.advancedSearchParams.staffNumber) {
                searchParametersUsed.push('staff id');
            }
            if (action.advancedSearchParams.costCode) {
                searchParametersUsed.push('test centre');
            }
            searchParametersUsed.forEach(function (searchParameter) {
                if (label === '') {
                    label = searchParameter;
                    return;
                }
                label = label + ", " + searchParameter;
            });
            _this.analytics.logEvent(AnalyticsEventCategories.TEST_RESULTS_SEARCH, AnalyticsEvents.LDTM_SEARCH, label);
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestResultsSearchAnalyticsEffects.prototype, "testResultSearchViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestResultsSearchAnalyticsEffects.prototype, "performApplicationReferenceSearch$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestResultsSearchAnalyticsEffects.prototype, "performDriverNumberSearch$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestResultsSearchAnalyticsEffects.prototype, "performLDTMSearch$", void 0);
    TestResultsSearchAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions])
    ], TestResultsSearchAnalyticsEffects);
    return TestResultsSearchAnalyticsEffects;
}());
export { TestResultsSearchAnalyticsEffects };
//# sourceMappingURL=test-results-search.analytics.effects.js.map