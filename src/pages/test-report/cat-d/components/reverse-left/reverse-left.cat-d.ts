import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { OverlayCallback } from '../../../test-report.model';
import { ReverseLeftPopoverOpened, ReverseLeftPopoverClosed } from './reverse-left.cat-d.actions';
import { RecordManoeuvresSelection } from '../../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';
import { TestDataByCategoryProvider } from '../../../../../providers/test-data-by-category/test-data-by-category';
import { getManoeuvres } from '../../../../../modules/tests/test-data/cat-d/test-data.cat-d.selector';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { getReverseLeftSelected }
from '../../../../../modules/tests/test-data/cat-d/manoeuvres/manoeuvres.cat-d.selectors';
import { DeselectReverseLeftManoeuvreCatD }
from '../../../../../modules/tests/test-data/cat-d/manoeuvres/manoeuvres.cat-d.actions';

@Component({
  selector: 'reverse-left-cat-d',
  templateUrl: 'reverse-left.cat-d.html',
})
export class ReverseLeftCatDComponent implements OnInit, OnDestroy  {

  @Input()
  completed: boolean;

  @Input()
  controlLabel: string;

  @Input()
  clickCallback: OverlayCallback;

  @Input()
  testCategory: TestCategory;

  completedReverseLeft: boolean = false;

  drivingFaults: number = 0;
  hasSeriousFault: boolean = false;
  hasDangerousFault: boolean = false;

  subscription: Subscription;

  displayPopover: boolean = false;

  constructor(
    private store$: Store<StoreModel>,
    private faultCountProvider: FaultCountProvider,
    private testDataByCategory: TestDataByCategoryProvider,
  ) {}

  ngOnInit(): void {

    const manoeuvres$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(this.testDataByCategory.getTestDataByCategoryCode(this.testCategory)),
      select(getManoeuvres),
    );

    this.subscription = manoeuvres$.subscribe((manoeuvres: CatDUniqueTypes.Manoeuvres) => {
      this.drivingFaults =
        this.faultCountProvider.getManoeuvreFaultCount(this.testCategory, manoeuvres, CompetencyOutcome.DF);
      this.hasSeriousFault =
        this.faultCountProvider.getManoeuvreFaultCount(this.testCategory, manoeuvres, CompetencyOutcome.S) > 0;
      this.hasDangerousFault =
        this.faultCountProvider.getManoeuvreFaultCount(this.testCategory, manoeuvres, CompetencyOutcome.D) > 0;
      this.completedReverseLeft = getReverseLeftSelected(manoeuvres);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleReverseLeft = (): void => {
    if (this.completedReverseLeft && !this.hasFaults()) {
      this.store$.dispatch(new DeselectReverseLeftManoeuvreCatD());
      return;
    }
    this.store$.dispatch(new RecordManoeuvresSelection(ManoeuvreTypes.reverseLeft));
  }

  hasFaults = (): boolean => {
    return this.drivingFaults > 0 || this.hasSeriousFault || this.hasDangerousFault;
  }

  togglePopoverDisplay = (): void => {
    if (this.displayPopover) {
      this.store$.dispatch(new ReverseLeftPopoverClosed());
      this.displayPopover = false;
    } else {
      this.store$.dispatch(new ReverseLeftPopoverOpened());
      this.displayPopover = true;
    }
    this.toggleOverlay();
  }

  toggleOverlay(): void {
    if (this.clickCallback) {
      this.clickCallback.callbackMethod();
    }
  }
}
