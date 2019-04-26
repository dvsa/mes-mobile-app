import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getEco } from '../../../../modules/tests/test_data/test-data.selector';
import {
  ToggleEco,
  ToggleControlEco,
  TogglePlanningEco,
} from '../../../../modules/tests/test_data/test-data.actions';

@Component({
  selector: 'eco',
  templateUrl: 'eco.html',
})
export class EcoComponent implements OnInit {

  subscription: Subscription;

  completed: boolean = false;
  adviceGivenPlanning: boolean = false;
  adviceGivenControl: boolean = false;

  constructor(
    private store$: Store<StoreModel>,
  ) {}

  ngOnInit(): void {

    const eco$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getEco),
      );

    this.subscription = eco$.subscribe((eco) => {
      this.completed = eco.completed;
      this.adviceGivenPlanning = eco.adviceGivenPlanning;
      this.adviceGivenControl = eco.adviceGivenControl;
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleEco = (): void => {
    if (this.adviceGivenPlanning || this.adviceGivenControl) {
      return;
    }
    this.store$.dispatch(new ToggleEco());
  }

  toggleEcoPlanning = (): void => {
    this.store$.dispatch(new TogglePlanningEco());
  }

  toggleEcoControl = (): void => {
    this.store$.dispatch(new ToggleControlEco());
  }
}
