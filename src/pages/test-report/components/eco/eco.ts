import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getEco } from '../../../../modules/tests/test-data/common/test-data.selector';
import {
  ToggleEco,
  ToggleControlEco,
  TogglePlanningEco,
} from '../../../../modules/tests/test-data/common/eco/eco.actions';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

interface EcoComponentState {
  completed$: Observable<boolean>;
  adviceGivenPlanning$: Observable<boolean>;
  adviceGivenControl$: Observable<boolean>;
}

@Component({
  selector: 'eco',
  templateUrl: 'eco.html',
})
export class EcoComponent implements OnInit {

  subscription: Subscription;

  adviceGivenPlanning: boolean = false;
  adviceGivenControl: boolean = false;
  componentState: EcoComponentState;
  merged$: Observable<boolean>;

  constructor(
    private store$: Store<StoreModel>,
  ) { }

  ngOnInit(): void {

    const eco$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getEco),
    );

    this.componentState = {
      completed$: eco$.pipe(
        map(eco => eco.completed),
      ),
      adviceGivenPlanning$: eco$.pipe(
        map(eco => eco.adviceGivenPlanning),
      ),
      adviceGivenControl$: eco$.pipe(
        map(eco => eco.adviceGivenControl),
      ),
    };

    const { completed$, adviceGivenPlanning$, adviceGivenControl$ } = this.componentState;

    const merged$ = merge(
      completed$,
      adviceGivenPlanning$.pipe(map(toggle => this.adviceGivenPlanning = toggle)),
      adviceGivenControl$.pipe(map(toggle => this.adviceGivenControl = toggle)),
    );

    this.subscription = merged$.subscribe();
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
