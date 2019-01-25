import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../common/store.model';
import { getJournalState } from '../../journal.reducer';
import { map } from 'rxjs/operators';
import { getSelectedDate } from '../../journal.selector';
import { Observable } from 'rxjs/Observable';

import { SelectPreviousDay, SelectNextDay } from '../../journal.actions';

interface JournalNavigationPageState {
  selectedDate$: Observable<string>,
}

@Component({
  selector: 'journal-navigation',
  templateUrl: 'journal-navigation.html'
})
export class JournalNavigationComponent implements OnInit {

  pageState: JournalNavigationPageState;

  constructor(private store$: Store<StoreModel>) {}

  ngOnInit(): void {
    this.pageState = {
      selectedDate$: this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate)
      ),
    };
  }

  onPreviousDayClick() {
    this.store$.dispatch(new SelectPreviousDay());
  }

  onNextDayClick() {
    this.store$.dispatch(new SelectNextDay());
  }
}