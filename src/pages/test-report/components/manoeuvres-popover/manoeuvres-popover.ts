import { Manoeuvres } from '@dvsa/mes-test-schema/categories/B';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../shared/models/store.model';
import { RecordManoeuvresSelection } from '../../../../modules/tests/test_data/test-data.actions';

@Component({
  selector: 'manoeuvres-popover',
  templateUrl: 'manoeuvres-popover.html',
})
export class ManoeuvresPopoverComponent {
  manoeuvres$: Observable<Manoeuvres>;
  subscription: Subscription;
  constructor(private store$: Store<StoreModel>) { }
  ngOnInit(): void {
    this.manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select('manoeuvres'),
    );
  }
  recordManoeuvreSelection(name: string): void {
    this.store$.dispatch(new RecordManoeuvresSelection(name));
  }
}
