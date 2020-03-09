import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getJournalState } from '../../../../modules/journal/journal.reducer';
import { map } from 'rxjs/operators';
import { getSelectedDate, canNavigateToPreviousDay, canNavigateToNextDay }
  from '../../../../modules/journal/journal.selector';
import { Observable } from 'rxjs';

import { SelectPreviousDay, SelectNextDay } from '../../../../modules/journal/journal.actions';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';

interface JournalNavigationPageState {
  selectedDate$: Observable<string>;
  canNavigateToPreviousDay$: Observable<boolean>;
  canNavigateToNextDay$: Observable<boolean>;
  isSelectedDateToday$: Observable<boolean>;
}

@Component({
  selector: 'journal-navigation',
  templateUrl: 'journal-navigation.html',
})
export class JournalNavigationComponent implements OnInit {

  pageState: JournalNavigationPageState;

  constructor(
    private store$: Store<StoreModel>,
    private dateTimeProvider: DateTimeProvider) {}

  ngOnInit(): void {
    this.pageState = {
      selectedDate$: this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate),
      ),
      canNavigateToPreviousDay$: this.store$.pipe(
        select(getJournalState),
        map(journal => canNavigateToPreviousDay(journal, this.dateTimeProvider.now())),
      ),
      canNavigateToNextDay$: this.store$.pipe(
        select(getJournalState),
        map(canNavigateToNextDay),
      ),
      isSelectedDateToday$: this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate),
        map(selectedDate => selectedDate === this.dateTimeProvider.now().format('YYYY-MM-DD')),
      ),
    };
  }

  onPreviousDayClick(): void {
    this.store$.dispatch(new SelectPreviousDay());
  }

  onNextDayClick(): void {
    this.store$.dispatch(new SelectNextDay());
  }
}
