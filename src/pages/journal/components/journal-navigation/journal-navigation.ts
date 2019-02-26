import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getJournalState } from '../../journal.reducer';
import { map } from 'rxjs/operators';
import { getSelectedDate, canNavigateToPreviousDay, canNavigateToNextDay, isToday } from '../../journal.selector';
import { Observable } from 'rxjs/Observable';

import { SelectPreviousDay, SelectNextDay } from '../../journal.actions';

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

  constructor(private store$: Store<StoreModel>) {}

  ngOnInit(): void {
    this.pageState = {
      selectedDate$: this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate),
      ),
      canNavigateToPreviousDay$: this.store$.pipe(
        select(getJournalState),
        map(canNavigateToPreviousDay),
      ),
      canNavigateToNextDay$: this.store$.pipe(
        select(getJournalState),
        map(canNavigateToNextDay),
      ),
      isSelectedDateToday$: this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate),
        map(isToday),
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
