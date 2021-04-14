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
import { withLatestFrom, switchMap, concatMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticsScreenNames, AnalyticsDimensionIndices, AnalyticsEventCategories, AnalyticsEvents, AnalyticsErrorTypes, } from '../../providers/analytics/analytics.model';
import { OFFICE_VIEW_DID_ENTER, SAVING_WRITE_UP_FOR_LATER, OFFICE_VALIDATION_ERROR, COMPLETE_TEST, TEST_START_DATE_CHANGED, } from '../../pages/office/office.actions';
import { CIRCUIT_TYPE_CHANGED, } from '../../modules/tests/test-summary/cat-a-mod1/test-summary.cat-a-mod1.actions';
import { MODE_OF_TRANSPORT_CHANGED, } from '../../modules/tests/test-summary/cat-a-mod2/test-summary.cat-a-mod2.actions';
import { INDEPENDENT_DRIVING_TYPE_CHANGED, } from '../../modules/tests/test-summary/common/test-summary.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, isPassed, getJournalData } from '../../modules/tests/tests.selector';
import { of } from 'rxjs';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getCandidateId } from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { isRekey } from '../../modules/tests/rekey/rekey.selector';
import { getRekeyIndicator } from '../../modules/tests/rekey/rekey.reducer';
import { getApplicationReference, } from '../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getApplicationNumber, } from '../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
var OfficeAnalyticsEffects = /** @class */ (function () {
    function OfficeAnalyticsEffects(analytics, actions$, store$) {
        var _this = this;
        this.analytics = analytics;
        this.actions$ = actions$;
        this.store$ = store$;
        this.officeViewDidEnter$ = this.actions$.pipe(ofType(OFFICE_VIEW_DID_ENTER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(isPassed)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getCandidateId)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getApplicationReference), select(getApplicationNumber)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], isPassed = _a[2], candidateId = _a[3], applicationReference = _a[4];
            var screenName = isPassed
                ? formatAnalyticsText(AnalyticsScreenNames.PASS_TEST_SUMMARY, tests)
                : formatAnalyticsText(AnalyticsScreenNames.FAIL_TEST_SUMMARY, tests);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, "" + candidateId);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
            _this.analytics.setCurrentPage(screenName);
            return of(new AnalyticRecorded());
        }));
        this.testStartDateChanged$ = this.actions$.pipe(ofType(TEST_START_DATE_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getCandidateId)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getApplicationReference), select(getApplicationNumber)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], candidateId = _a[2], applicationReference = _a[3];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, "" + candidateId);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.OFFICE, tests), formatAnalyticsText(AnalyticsEvents.DATE_OF_TEST_CHANGED, tests), "previous date: " + action.previousStartDate + "; new date: " + action.customStartDate);
            return of(new AnalyticRecorded());
        }));
        this.savingWriteUpForLaterEffect$ = this.actions$.pipe(ofType(SAVING_WRITE_UP_FOR_LATER), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(isPassed)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getCandidateId)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getApplicationReference), select(getApplicationNumber)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], isPassed = _a[2], candidateId = _a[3], applicationReference = _a[4];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, "" + candidateId);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.POST_TEST, tests), formatAnalyticsText(AnalyticsEvents.SAVE_WRITE_UP, tests), isPassed ? 'pass' : 'fail');
            return of(new AnalyticRecorded());
        }));
        this.validationErrorEffect$ = this.actions$.pipe(ofType(OFFICE_VALIDATION_ERROR), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(isPassed)))); }), switchMap(function (_a) {
            var action = _a[0], tests = _a[1], isPassed = _a[2];
            var screenName = isPassed ? AnalyticsScreenNames.PASS_TEST_SUMMARY : AnalyticsScreenNames.FAIL_TEST_SUMMARY;
            var formattedScreenName = formatAnalyticsText(screenName, tests);
            _this.analytics.logError(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + formattedScreenName + ")", action.errorMessage);
            return of(new AnalyticRecorded());
        }));
        this.completeTest$ = this.actions$.pipe(ofType(COMPLETE_TEST), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTest), select(getRekeyIndicator), select(isRekey)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getCandidate), select(getCandidateId)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getJournalData), select(getApplicationReference), select(getApplicationNumber)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(isPassed)))); }), switchMap(function (_a) {
            var action = _a[0], isRekey = _a[1], candidateId = _a[2], applicationReference = _a[3], isPassed = _a[4];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, "" + candidateId);
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, applicationReference);
            _this.analytics.logEvent(AnalyticsEventCategories.POST_TEST, isRekey ? AnalyticsEvents.COMPLETE_REKEY_TEST : AnalyticsEvents.COMPLETE_TEST, isPassed ? 'pass' : 'fail');
            return of(new AnalyticRecorded());
        }));
        this.setCircuit$ = this.actions$.pipe(ofType(CIRCUIT_TYPE_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], category = _a[2];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.OFFICE, tests), formatAnalyticsText(AnalyticsEvents.CIRCUIT_CHANGED, tests), "Circuit type " + action.circuitType + " selected");
            return of(new AnalyticRecorded());
        }));
        this.setIndependentDrivingType$ = this.actions$.pipe(ofType(INDEPENDENT_DRIVING_TYPE_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], category = _a[2];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.OFFICE, tests), formatAnalyticsText(AnalyticsEvents.INDEPENDENT_DRIVING_TYPE_CHANGED, tests), action.drivingType + " selected");
            return of(new AnalyticRecorded());
        }));
        this.setModeOfTransport$ = this.actions$.pipe(ofType(MODE_OF_TRANSPORT_CHANGED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests)), _this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)))); }), concatMap(function (_a) {
            var action = _a[0], tests = _a[1], category = _a[2];
            _this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, category);
            _this.analytics.logEvent(formatAnalyticsText(AnalyticsEventCategories.OFFICE, tests), formatAnalyticsText(AnalyticsEvents.MODE_OF_TRANSPORT_CHANGED, tests), action.modeOfTransport + " selected");
            return of(new AnalyticRecorded());
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeAnalyticsEffects.prototype, "officeViewDidEnter$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeAnalyticsEffects.prototype, "testStartDateChanged$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeAnalyticsEffects.prototype, "savingWriteUpForLaterEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeAnalyticsEffects.prototype, "validationErrorEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeAnalyticsEffects.prototype, "completeTest$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeAnalyticsEffects.prototype, "setCircuit$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeAnalyticsEffects.prototype, "setIndependentDrivingType$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeAnalyticsEffects.prototype, "setModeOfTransport$", void 0);
    OfficeAnalyticsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnalyticsProvider,
            Actions,
            Store])
    ], OfficeAnalyticsEffects);
    return OfficeAnalyticsEffects;
}());
export { OfficeAnalyticsEffects };
//# sourceMappingURL=office.analytics.effects.js.map