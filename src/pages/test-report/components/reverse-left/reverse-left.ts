import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { ReverseLeftPopoverClosed, ReverseLeftPopoverOpened } from './reverse-left.actions';
import { getTests } from '../../../../modules/tests/tests.reducer';
import {
  RecordManoeuvresDeselection,
  RecordManoeuvresSelection,
} from '../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { OverlayCallback } from '../../test-report.model';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { ManoeuvreTypes } from '../../../../modules/tests/test-data/test-data.constants';
import { StoreModel } from '../../../../shared/models/store.model';
import { FaultCountProvider } from '../../../../providers/fault-count/fault-count';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
import {
  ManoeuvresByCategoryProvider,
  ManoeuvreUnion,
} from '../../../../providers/manoeuvres-by-category/manoeuvres-by-category';
import { getReverseLeftSelected } from '../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'reverse-left',
  templateUrl: 'reverse-left.html',
})
export class ReverseLeftComponent implements OnInit, OnDestroy  {

  @Input()
  completed: boolean;

  @Input()
  controlLabel: string;

  @Input()
  testCategory: TestCategory;

  @Input()
  clickCallback: OverlayCallback;

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
    private manoeuvresByCategory: ManoeuvresByCategoryProvider,
  ) {}

  ngOnInit(): void {
    const manoeuvres$ = this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        map(data => this.testDataByCategory.getTestDataByCategoryCode(this.testCategory)(data)),
        select(this.manoeuvresByCategory.getManoeuvresByCategoryCode(this.testCategory)),
      );

    this.subscription = manoeuvres$.subscribe((manoeuvres: ManoeuvreUnion) => {
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
      this.store$.dispatch(new RecordManoeuvresDeselection(ManoeuvreTypes.reverseLeft));
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
