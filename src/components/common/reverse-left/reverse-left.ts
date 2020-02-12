import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { ReverseLeftPopoverOpened, ReverseLeftPopoverClosed } from './reverse-left.actions';
import { getTests } from '../../../modules/tests/tests.reducer';
import { RecordManoeuvresSelection } from '../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { OverlayCallback } from '../../../pages/test-report/test-report.model';
import { getCurrentTest } from '../../../modules/tests/tests.selector';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { ManoeuvreTypes } from '../../../modules/tests/test-data/test-data.constants';
import { StoreModel } from '../../../shared/models/store.model';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { DeselectReverseLeftManoeuvreCatC }
 from '../../../modules/tests/test-data/cat-c/manoeuvres/manoeuvres.cat-c.actions';
import { DeselectReverseLeftManoeuvreCatD }
 from '../../../modules/tests/test-data/cat-d/manoeuvres/manoeuvres.cat-d.actions';
import { DeselectReverseLeftManoeuvre }
 from '../../../modules/tests/test-data/cat-be/manoeuvres/manoeuvres.cat-be.actions';
import { TestDataByCategoryProvider } from '../../../providers/test-data-by-category/test-data-by-category';
import { getReverseLeftSelected as getReverseLeftSelectedBE }
 from '../../../modules/tests/test-data/cat-be/manoeuvres/manoeuvres.cat-be.selectors';
import { getReverseLeftSelected as getReverseLeftSelectedC }
 from '../../../modules/tests/test-data/cat-c/manoeuvres/manoeuvres.cat-c.selectors';
import { getReverseLeftSelected as getReverseLeftSelectedD }
 from '../../../modules/tests/test-data/cat-d/manoeuvres/manoeuvres.cat-d.selectors';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { ManoeuvresByCategoryProvider, ManoeuvreUnion }
  from '../../../providers/manoeuvres-by-category/manoeuvres-by-category';

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
  reducerInfo: any;

  constructor(
    private store$: Store<StoreModel>,
    private faultCountProvider: FaultCountProvider,
    private testDataByCategory: TestDataByCategoryProvider,
    private manoeuvresByCategory: ManoeuvresByCategoryProvider,
  ) {}

  ngOnInit(): void {
    this.reducerInfo = this.getReducerInfo(this.testCategory);
    const manoeuvres$ = this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(this.testDataByCategory.getTestDataByCategoryCode(this.testCategory)),
        select(this.manoeuvresByCategory.getManoeuvresByCategoryCode(this.testCategory)),
      );

    this.subscription = manoeuvres$.subscribe((manoeuvres: ManoeuvreUnion) => {
      this.drivingFaults =
          this.faultCountProvider.getManoeuvreFaultCount(this.testCategory, manoeuvres, CompetencyOutcome.DF);
      this.hasSeriousFault =
          this.faultCountProvider.getManoeuvreFaultCount(this.testCategory, manoeuvres, CompetencyOutcome.S) > 0;
      this.hasDangerousFault =
          this.faultCountProvider.getManoeuvreFaultCount(this.testCategory, manoeuvres, CompetencyOutcome.D) > 0;
      this.completedReverseLeft = this.reducerInfo.completedReverseLeft.call(this, manoeuvres);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleReverseLeft = (): void => {
    if (this.completedReverseLeft && !this.hasFaults()) {
      this.store$.dispatch(this.reducerInfo.deselectReverseLeftManoeuvre);
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

  getReducerInfo(categoryCode: CategoryCode) {
    const testCategory = categoryCode as TestCategory;
    switch (testCategory) {
      case TestCategory.C:
      case TestCategory.C1:
      case TestCategory.C1E:
      case TestCategory.CE:
        return {
          completedReverseLeft: getReverseLeftSelectedC,
          deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatC(),
        };
      case TestCategory.D1:
      case TestCategory.D1E:
      case TestCategory.D:
      case TestCategory.DE:
        return {
          completedReverseLeft: getReverseLeftSelectedD,
          deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvreCatD(),
        };
      default:
        return {
          completedReverseLeft: getReverseLeftSelectedBE,
          deselectReverseLeftManoeuvre: new DeselectReverseLeftManoeuvre(),
        };
    }
  }
}
