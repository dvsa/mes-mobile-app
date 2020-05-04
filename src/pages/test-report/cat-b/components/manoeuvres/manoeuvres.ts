import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTestData } from '../../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getManoeuvres } from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { Subscription, Observable } from 'rxjs';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { OverlayCallback } from '../../../test-report.model';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Manoeuvres } from '@dvsa/mes-test-schema/categories/B/partial';
import { getTestReportState } from '../../../test-report.reducer';
import { isRemoveFaultMode } from '../../../test-report.selector';

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
  isRemoveFaultMode: boolean = false;

  subscription: Subscription;

  displayPopover: boolean;
  manoeuvres$: Observable<CatBUniqueTypes.Manoeuvres>;
  isRemoveFaultMode$: Observable<boolean>;

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
      this.drivingFaults =
        this.faultCountProvider.getManoeuvreFaultCount<Manoeuvres>(
          TestCategory.B, manoeuvres, CompetencyOutcome.DF,
        );
      this.hasSeriousFault =
        this.faultCountProvider.getManoeuvreFaultCount<Manoeuvres>(
          TestCategory.B, manoeuvres, CompetencyOutcome.S,
        ) > 0;
      this.hasDangerousFault =
        this.faultCountProvider.getManoeuvreFaultCount<Manoeuvres>(
          TestCategory.B, manoeuvres, CompetencyOutcome.D,
        ) > 0;
    });
  }

  ngOnChanges(): void {
    this.isRemoveFaultMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isRemoveFaultMode),
    );
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
