import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { StoreModel } from '../../../../shared/models/store.model';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { ToggleVerbalEta, TogglePhysicalEta } from '../../../../modules/tests/test_data/test-data.actions';
import { getETA, getETAVerbal, getETAPhysical } from '../../../../modules/tests/test_data/test-data.selector';

interface ETAComponentState {
  verbal$: Observable<boolean>;
  physical$: Observable<boolean>;
}
@Component({
  selector: 'eta',
  templateUrl: 'eta.html',
})
export class EtaComponent implements OnInit {

  componentState: ETAComponentState;
  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    const eta$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getETA),
    );
    this.componentState = {
      verbal$: eta$.pipe(map(getETAVerbal)),
      physical$: eta$.pipe(map(getETAPhysical)),
    };
  }
  toggleVerbal() {
    this.store$.dispatch(new ToggleVerbalEta());
  }
  togglePhysical() {
    this.store$.dispatch(new TogglePhysicalEta());
  }
}
