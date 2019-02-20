import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../common/store.model';
import { getJournalState } from '../../journal.reducer';
import { map } from 'rxjs/operators';
import { getSelectedDate, canNavigateToPreviousDay, canNavigateToNextDay, isToday } from '../../journal.selector';
import { Observable } from 'rxjs/Observable';

import { SelectPreviousDay, SelectNextDay } from '../../journal.actions';
import { getAppInfoState } from '../../../../app-info/app-info.reducer';
import { getVersionNumber } from '../../../../app-info/app-info.selector';

interface JournalNavigationPageState {
  selectedDate$: Observable<string>;
  canNavigateToPreviousDay$: Observable<boolean>;
  canNavigateToNextDay$: Observable<boolean>;
  isSelectedDateToday$: Observable<boolean>;

  appVersion$: Observable<string>;
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

      appVersion$: this.store$.pipe(
        select(getAppInfoState),
        map(getVersionNumber),
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
