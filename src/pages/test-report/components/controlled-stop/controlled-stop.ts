import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { hasControlledStopBeenCompleted } from '../../../../modules/tests/test_data/test-data.selector';
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
    this.componentState = {
      selectedControlledStop$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(hasControlledStopBeenCompleted),
      ),
    };
  }

  toggleControlledStop = (): void => {
    this.store$.dispatch(new ToggleControlledStop());
  }

}
