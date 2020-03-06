// TO-DO ADI Part2: implement correct category
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
// TO-DO ADI Part2: implement correct reducer
import { getTestData } from '../../../../../modules/tests/test-data/cat-b/test-data.reducer';
// TO-DO ADI Part2: implement correct selector
import { getManoeuvres } from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { Subscription, Observable } from 'rxjs';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { OverlayCallback } from '../../../test-report.model';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

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

    // TO-DO ADI Part2: implement correct categories
    this.subscription = this.manoeuvres$.subscribe((manoeuvres: CatBUniqueTypes.Manoeuvres) => {
      this.drivingFaults =
        this.faultCountProvider.getManoeuvreFaultCount(TestCategory.B, manoeuvres, CompetencyOutcome.DF);
      this.hasSeriousFault =
        this.faultCountProvider.getManoeuvreFaultCount(TestCategory.B, manoeuvres, CompetencyOutcome.S) > 0;
      this.hasDangerousFault =
        this.faultCountProvider.getManoeuvreFaultCount(TestCategory.B, manoeuvres, CompetencyOutcome.D) > 0;
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
