import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { groupBy } from 'lodash';
import * as moment from 'moment';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from './journal.reducer';
import { ExaminerWorkSchedule } from '../../common/domain/DJournal';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { SlotProvider } from '../../providers/slot/slot';
import { getSelectedDate, getLastRefreshed, getSlots, canNavigateToPreviousDay, canNavigateToNextDay } from './journal.selector';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsEventCategories,
  AnalyticsEvents,
  AnalyticsScreenNames
} from '../../providers/analytics/analytics.model';

@Injectable()
export class JournalEffects {
  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider,
    private slotProvider: SlotProvider,
    private store$: Store<StoreModel>,
    private analytics: AnalyticsProvider
  ) {}

  @Effect()
  journal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate)
      ),
      this.store$.pipe(
        select(getJournalState),
        map(getLastRefreshed)
      ),
      this.store$.pipe(
        select(getJournalState),
        map(getSlots)
      )
    ),
    switchMap(([action, selectedDate, lastRefreshed, slots]) => {
      return this.journalProvider
        .getJournal(lastRefreshed)
        .pipe(
          map((journalData: ExaminerWorkSchedule) => this.slotProvider.detectSlotChanges(slots, journalData)),
          map((slots: any[]) => groupBy(slots, this.slotProvider.getSlotDate)),
          map((slots: {[k: string]: SlotItem[]}) => new journalActions.LoadJournalSuccess(slots)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        );
    }),
  )

  @Effect()
  selectPreviousDayEffect$ = this.actions$.pipe(
    ofType(journalActions.SELECT_PREVIOUS_DAY),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate)
      ),
      this.store$.pipe(
        select(getJournalState),
        map(canNavigateToPreviousDay)
      )
    ),
    switchMap(([action, selectedDate, canNavigateToPreviousDay]) => {
      if (!canNavigateToPreviousDay) {
        return of();
      }
      const previousDay = moment(selectedDate).add(-1, 'day').format('YYYY-MM-DD');
      this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.NAVIGATION, this.analytics.getDescriptiveDate(previousDay));
      this.analytics.setCurrentPage(`${this.analytics.getDescriptiveDate(previousDay)} ${AnalyticsScreenNames.JOURNAL}`);
      return of(new journalActions.SetSelectedDate(previousDay));
    }),
  )

  @Effect()
  selectNextDayEffect$ = this.actions$.pipe(
    ofType(journalActions.SELECT_NEXT_DAY),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate)
      ),
      this.store$.pipe(
        select(getJournalState),
        map(canNavigateToNextDay)
      )
    ),
    switchMap(([action, selectedDate, canNavigateToNextDay]) => {
      if (!canNavigateToNextDay) {
        return of();
      }
      const nextDay = moment(selectedDate).add(1, 'day').format('YYYY-MM-DD');
      this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.NAVIGATION, this.analytics.getDescriptiveDate(nextDay));
      this.analytics.setCurrentPage(`${this.analytics.getDescriptiveDate(nextDay)} ${AnalyticsScreenNames.JOURNAL}`);

      return of(new journalActions.SetSelectedDate(nextDay));
    }),
  )
}
