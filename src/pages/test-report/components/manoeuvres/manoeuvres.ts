import { Manoeuvres } from '@dvsa/mes-test-schema/categories/B';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { OverlayCallback } from '../../cat-b/test-report.cat-b.page';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTestData } from '../../../../modules/tests/test-data/test-data.reducer';
import { getManoeuvres, sumManoeuvreFaults } from '../../../../modules/tests/test-data/test-data.selector';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
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
  manoeuvres$: Observable<Manoeuvres>;

  constructor(private store$: Store<StoreModel>) {
    this.displayPopover = false;
  }

  ngOnInit(): void {
    this.manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getManoeuvres),
    );

    this.subscription = this.manoeuvres$.subscribe((manoeuvres: Manoeuvres) => {
      this.drivingFaults = sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
      this.hasSeriousFault = sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) > 0;
      this.hasDangerousFault = sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) > 0;
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
