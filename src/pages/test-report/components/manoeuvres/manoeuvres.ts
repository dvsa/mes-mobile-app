import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OverlayCallback } from '../../test-report';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getManoeuvres } from '../../../../modules/tests/test_data/test-data.selector';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { Subscription } from 'rxjs/Subscription';
import { startsWith, pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';

@Component({
  selector: 'manoeuvres',
  templateUrl: 'manoeuvres.html',
})
export class ManoeuvresComponent implements OnInit, OnDestroy {

  @Input()
  controlLabel: String;
  @Input()
  completed: boolean;

  @Input()
  clickCallback: OverlayCallback;

  drivingFaults: number = 0;
  hasSeriousFault: boolean = false;
  hasDangerousFault: boolean = false;

  subscription: Subscription;

  displayPopover: boolean;

  constructor(private store$: Store<StoreModel>) {
    this.displayPopover = false;
  }

  ngOnInit(): void {
    const manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getManoeuvres),
    );

    this.subscription = manoeuvres$.subscribe((manoeuvres) => {

      const outcomes = pickBy(manoeuvres, (value, key) => startsWith(key, 'outcome'));

      this.drivingFaults = Object.values(outcomes).filter(outcome => outcome === CompetencyOutcome.DF).length;
      this.hasSeriousFault = Object.values(outcomes).includes(CompetencyOutcome.S);
      this.hasDangerousFault = Object.values(outcomes).includes(CompetencyOutcome.D);

      console.log('### drivingFaults', this.drivingFaults);
      console.log('### hasSeriousFault', this.hasSeriousFault);
      console.log('### hasDangerousFaults', this.hasDangerousFault);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  togglePopoverDisplay(): void {
    this.displayPopover = !this.displayPopover;
    this.toggleOverlay();
  }

  toggleOverlay(): void {
    if (this.clickCallback) {
      this.clickCallback.callbackMethod();
    }
  }
}
