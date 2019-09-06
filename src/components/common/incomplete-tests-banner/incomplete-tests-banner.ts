import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { Observable } from 'rxjs/Observable';
import { getIncompleteTestsCount } from './incomplete-tests-banner.selector';

interface IncompleteTestsBannerComponentState {
  count$: Observable<number>;
}

@Component({
  selector: 'incomplete-tests-banner',
  templateUrl: 'incomplete-tests-banner.html',
})

export class IncompleteTestsBanner implements OnInit {

  componentState: IncompleteTestsBannerComponentState;

  constructor(
    private store$: Store<StoreModel>,
    private dateTimeProvider: DateTimeProvider,
  ) {}

  ngOnInit() {
    const today = this.dateTimeProvider.now();
    this.componentState = {
      count$: this.store$.pipe(
        select(store => getIncompleteTestsCount(store, today)),
      ),
    };
  }

}
