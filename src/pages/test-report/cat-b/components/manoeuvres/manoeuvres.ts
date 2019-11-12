import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTestData } from '../../../../../modules/tests/test-data/test-data.reducer';
import { getManoeuvres } from '../../../../../modules/tests/test-data/test-data.selector';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { OverlayCallback } from '../../../test-report.model';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';

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
  manoeuvres$: Observable<CatBUniqueTypes.Manoeuvres>;

  constructor(
    private store$: Store<StoreModel>,
    private faultCountProvider: FaultCountProvider,
  ) {
    this.displayPopover = false;
  }

  ngOnInit(): void {
    this.manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getManoeuvres),
    );

    this.subscription = this.manoeuvres$.subscribe((manoeuvres: CatBUniqueTypes.Manoeuvres) => {
      this.drivingFaults = this.faultCountProvider.sumManoeuvreFaultsCatB(manoeuvres, CompetencyOutcome.DF);
      this.hasSeriousFault = this.faultCountProvider.sumManoeuvreFaultsCatB(manoeuvres, CompetencyOutcome.S) > 0;
      this.hasDangerousFault = this.faultCountProvider.sumManoeuvreFaultsCatB(manoeuvres, CompetencyOutcome.D) > 0;
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
