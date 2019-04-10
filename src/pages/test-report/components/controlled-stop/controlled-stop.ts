import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getManoeuvres } from '../../../../modules/tests/test_data/test-data.selector';
import { map } from 'rxjs/operators';
import { ToggleControlledStop } from '../../../../modules/tests/test_data/test-data.actions';

interface ControlledStopComponentState {
  selectedControlledStop$: Observable<boolean>;
}

@Component({
  selector: 'controlled-stop',
  templateUrl: 'controlled-stop.html',
})
export class ControlledStopComponent implements OnInit {

  componentState: ControlledStopComponentState;

  constructor(private store$: Store<StoreModel>) {}

  ngOnInit(): void {
    const manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getManoeuvres),
    );

    this.componentState = {
      selectedControlledStop$: manoeuvres$.pipe(
        map(manoeuvres => manoeuvres.selectedControlledStop),
      ),
    };
  }

  toggleControlledStop = (): void => {
    this.store$.dispatch(new ToggleControlledStop());
  }

}
