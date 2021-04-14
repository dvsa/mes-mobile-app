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
import { switchMap, map, withLatestFrom, takeUntil, mapTo, filter, catchError, startWith, tap, concatMap } from 'rxjs/operators';
import { of, interval } from 'rxjs';
import { groupBy } from 'lodash';
import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { getJournalState } from './journal.reducer';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { SlotProvider } from '../../providers/slot/slot';
import { JournalRefreshModes, } from '../../providers/analytics/analytics.model';
import { getSelectedDate, getLastRefreshed, getSlots, canNavigateToPreviousDay, canNavigateToNextDay, getCompletedTests, } from './journal.selector';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { DateTime, Duration } from '../../shared/helpers/date-time';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { LogType } from '../../shared/models/log.model';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogHelper } from '../../providers/logs/logsHelper';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { SearchProvider } from '../../providers/search/search';
import moment from 'moment';
import { removeLeadingZeros } from '../../shared/helpers/formatters';
import { getExaminer } from '../tests/journal-data/common/examiner/examiner.reducer';
import { getStaffNumber } from '../tests/journal-data/common/examiner/examiner.selector';
import { hasStartedTests } from '../tests/tests.selector';
import { getTests } from '../tests/tests.reducer';
import { CompletedTestPersistenceProvider } from '../../providers/completed-test-persistence/completed-test-persistence';
var JournalEffects = /** @class */ (function () {
    function JournalEffects(actions$, journalProvider, slotProvider, store$, appConfig, networkStateProvider, dataStoreprovider, authProvider, dateTimeProvider, searchProvider, logHelper, completedTestPersistenceProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.journalProvider = journalProvider;
        this.slotProvider = slotProvider;
        this.store$ = store$;
        this.appConfig = appConfig;
        this.networkStateProvider = networkStateProvider;
        this.dataStoreprovider = dataStoreprovider;
        this.authProvider = authProvider;
        this.dateTimeProvider = dateTimeProvider;
        this.searchProvider = searchProvider;
        this.logHelper = logHelper;
        this.completedTestPersistenceProvider = completedTestPersistenceProvider;
        this.callJournalProvider$ = function (mode) {
            _this.store$.dispatch(new journalActions.JournalRefresh(mode));
            return of(null).pipe(withLatestFrom(_this.store$.pipe(select(getJournalState), map(getLastRefreshed)), _this.store$.pipe(select(getJournalState), map(getSlots)), _this.store$.pipe(select(getJournalState), map(function (journal) { return journal.examiner; }))), switchMap(function (_a) {
                var action = _a[0], lastRefreshed = _a[1], slots = _a[2], examiner = _a[3];
                return _this.journalProvider
                    .getJournal(lastRefreshed)
                    .pipe(tap(function (journalData) { return _this.journalProvider.saveJournalForOffline(journalData); }), map(function (journalData) { return ({
                    examiner: journalData.examiner,
                    slotItems: _this.slotProvider.detectSlotChanges(slots, journalData),
                }); }), map(function (examinerSlotItems) { return ({
                    examiner: examinerSlotItems.examiner,
                    slotItemsByDate: _this.getRelevantSlotItemsByDate(examinerSlotItems.slotItems),
                }); }), map(function (slotItemsByDate) {
                    return new journalActions.LoadJournalSuccess(slotItemsByDate, _this.networkStateProvider.getNetworkState(), _this.authProvider.isInUnAuthenticatedMode(), lastRefreshed);
                }), catchError(function (err) {
                    // For HTTP 304 NOT_MODIFIED we just use the slots we already have cached
                    if (err.status === HttpStatusCodes.NOT_MODIFIED) {
                        return of(new journalActions.LoadJournalSuccess({ examiner: examiner, slotItemsByDate: slots }, _this.networkStateProvider.getNetworkState(), _this.authProvider.isInUnAuthenticatedMode(), lastRefreshed));
                    }
                    if (err.message === 'Timeout has occurred') {
                        return of(new journalActions.JournalRefreshError('Retrieving Journal', err.message));
                    }
                    _this.store$.dispatch(new SaveLog(_this.logHelper.createLog(LogType.ERROR, 'Retrieving Journal', err.message)));
                    return ErrorObservable.create(err);
                }));
            }));
        };
        this.getRelevantSlotItemsByDate = function (slotItems) {
            var slotItemsByDate;
            slotItemsByDate = groupBy(slotItems, _this.slotProvider.getSlotDate);
            slotItemsByDate = _this.slotProvider.extendWithEmptyDays(slotItemsByDate);
            slotItemsByDate = _this.slotProvider.getRelevantSlots(slotItemsByDate);
            return slotItemsByDate;
        };
        this.journal$ = this.actions$.pipe(ofType(journalActions.LOAD_JOURNAL_SILENT), switchMap(function () { return _this.callJournalProvider$(JournalRefreshModes.AUTOMATIC).pipe(catchError(function (err) {
            return [
                new journalActions.JournalRefreshError('AutomaticJournalRefresh', err.message),
                new journalActions.LoadJournalSilentFailure(err),
            ];
        })); }));
        this.loadJournal$ = this.actions$.pipe(ofType(journalActions.LOAD_JOURNAL), switchMap(function () { return _this.callJournalProvider$(JournalRefreshModes.MANUAL).pipe(catchError(function (err) {
            return [
                new journalActions.JournalRefreshError('ManualJournalRefresh', err.message),
                new journalActions.LoadJournalFailure(err),
            ];
        })); }));
        this.pollingSetup$ = this.actions$.pipe(ofType(journalActions.SETUP_JOURNAL_POLLING), switchMap(function () {
            // Switch map the manual refreshes so they restart the timer.
            var manualRefreshes$ = _this.actions$.pipe(ofType(journalActions.LOAD_JOURNAL), 
            // Initial emission so poll doesn't wait until the first manual refresh
            startWith(null));
            var pollTimer$ = manualRefreshes$.pipe(switchMap(function () { return interval(_this.appConfig.getAppConfig().journal.autoRefreshInterval); }));
            var pollsWhileOnline$ = pollTimer$
                .pipe(withLatestFrom(_this.networkStateProvider.onNetworkChange()), filter(function (_a) {
                var _ = _a[0], connectionStatus = _a[1];
                return connectionStatus === ConnectionStatus.ONLINE;
            }));
            return pollsWhileOnline$
                .pipe(takeUntil(_this.actions$.pipe(ofType(journalActions.STOP_JOURNAL_POLLING))), mapTo({ type: journalActions.LOAD_JOURNAL_SILENT }));
        }));
        this.loadCompletedTests$ = this.actions$.pipe(ofType(journalActions.LOAD_COMPLETED_TESTS), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getJournalState), select(getExaminer), select(getStaffNumber)), _this.store$.pipe(select(getTests), select(hasStartedTests)), _this.store$.pipe(select(getJournalState), select(getCompletedTests)))); }), filter(function (_a) {
            var action = _a[0], staffNumber = _a[1], hasStartedTests = _a[2], completedTests = _a[3];
            // The callThrough property is set to true when doing a manual journal refresh for example
            if (action.callThrough) {
                return true;
            }
            return !hasStartedTests && completedTests && completedTests.length === 0;
        }), switchMap(function (_a) {
            var action = _a[0], staffNumber = _a[1];
            var numberOfDaysToView = _this.appConfig.getAppConfig().journal.numberOfDaysToView;
            var advancedSearchParams = {
                startDate: moment().subtract(numberOfDaysToView, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD'),
                staffNumber: removeLeadingZeros(staffNumber),
                costCode: '',
                excludeAutoSavedTests: 'true',
            };
            return _this.searchProvider.advancedSearch(advancedSearchParams).pipe(tap(function (searchResults) { return _this.completedTestPersistenceProvider.persistCompletedTests(searchResults); }), map(function (searchResults) {
                return new journalActions.LoadCompletedTestsSuccess(searchResults);
            }), catchError(function (err) {
                return of(new journalActions.LoadCompletedTestsFailure(err));
            }));
        }));
        this.selectPreviousDayEffect$ = this.actions$.pipe(ofType(journalActions.SELECT_PREVIOUS_DAY), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getJournalState), map(getSelectedDate)), _this.store$.pipe(select(getJournalState), map(function (journal) { return canNavigateToPreviousDay(journal, _this.dateTimeProvider.now()); })))); }), filter(function (_a) {
            var action = _a[0], selectedDate = _a[1], canNavigateToPreviousDay = _a[2];
            return canNavigateToPreviousDay;
        }), switchMap(function (_a) {
            var action = _a[0], selectedDate = _a[1], canNavigateToPreviousDay = _a[2];
            var previousDay = DateTime.at(selectedDate).add(-1, Duration.DAY).format('YYYY-MM-DD');
            return [
                new journalActions.SetSelectedDate(previousDay),
                new journalActions.JournalNavigateDay(previousDay),
            ];
        }));
        this.selectNextDayEffect$ = this.actions$.pipe(ofType(journalActions.SELECT_NEXT_DAY), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getJournalState), map(getSelectedDate)), _this.store$.pipe(select(getJournalState), map(canNavigateToNextDay)))); }), filter(function (_a) {
            var action = _a[0], selectedDate = _a[1], canNavigateToNextDay = _a[2];
            return canNavigateToNextDay;
        }), switchMap(function (_a) {
            var action = _a[0], selectedDate = _a[1], canNavigateToNextDay = _a[2];
            var nextDay = DateTime.at(selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD');
            return [
                new journalActions.SetSelectedDate(nextDay),
                new journalActions.JournalNavigateDay(nextDay),
            ];
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalEffects.prototype, "journal$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalEffects.prototype, "loadJournal$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalEffects.prototype, "pollingSetup$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalEffects.prototype, "loadCompletedTests$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalEffects.prototype, "selectPreviousDayEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalEffects.prototype, "selectNextDayEffect$", void 0);
    JournalEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            JournalProvider,
            SlotProvider,
            Store,
            AppConfigProvider,
            NetworkStateProvider,
            DataStoreProvider,
            AuthenticationProvider,
            DateTimeProvider,
            SearchProvider,
            LogHelper,
            CompletedTestPersistenceProvider])
    ], JournalEffects);
    return JournalEffects;
}());
export { JournalEffects };
//# sourceMappingURL=journal.effects.js.map