import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { Observable } from 'rxjs';
import { getIncompleteTestsCount } from './incomplete-tests-banner.selector';
import { SlotProvider } from '../../../providers/slot/slot';
import { DateTime } from '../../../shared/helpers/date-time';
import { getJournalState } from '../../../modules/journal/journal.reducer';
import { getTests } from '../../../modules/tests/tests.reducer';
import { map, withLatestFrom } from 'rxjs/operators';

interface IncompleteTestsBannerComponentState {
  count$: Observable<number>;
}

@Component({
  selector: 'incomplete-tests-banner',
  templateUrl: 'incomplete-tests-banner.html',
})

export class IncompleteTestsBanner implements OnInit {

  @Input()
  public todaysDate: DateTime;

  componentState: IncompleteTestsBannerComponentState;

  constructor(
    private store$: Store<StoreModel>,
    private slotProvider: SlotProvider,
  ) {}

  ngOnInit() {
    this.componentState = {
      count$: this.store$.pipe(
        select(getJournalState),
        withLatestFrom(this.store$.pipe(
          select(getTests),
        )),
        map(([journal, tests]) =>
          getIncompleteTestsCount(journal, tests, this.todaysDate, this.slotProvider)),
      ),
    };
  }

}
