import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { StoreModel } from '../../../../../shared/models/store.model';
import { map } from 'rxjs/operators';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { Observable } from 'rxjs/Observable';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TestDataByCategoryProvider } from '../../../../../providers/test-data-by-category/test-data-by-category';
import { getVehicleChecksCatD }
from '../../../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.selector';

interface ComponentState {
  vehicleChecksDrivingFaultCount$: Observable<number>;
  vehicleChecksSeriousFaultCount$: Observable<number>;
}

@Component({
  selector: 'vehicle-checks-compact-cat-d',
  templateUrl: 'vehicle-checks-compact.cat-d.html',
})
export class VehicleChecksCompactCatDComponent implements OnInit {

  @Input()
  testCategory: TestCategory;

  componentState: ComponentState;

  constructor(
    private store$: Store<StoreModel>,
    public faultCountProvider: FaultCountProvider,
    private testDataByCategory: TestDataByCategoryProvider,
  ) {}

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.componentState = {
      vehicleChecksDrivingFaultCount$: currentTest$.pipe(
        select(this.testDataByCategory.getTestDataByCategoryCode(this.testCategory)),
        select(getVehicleChecksCatD),
        map((vehicleChecks) => {
          return this.faultCountProvider.getVehicleChecksFaultCount(this.testCategory, vehicleChecks).drivingFaults;
        }),
      ),
      vehicleChecksSeriousFaultCount$: currentTest$.pipe(
        select(this.testDataByCategory.getTestDataByCategoryCode(this.testCategory)),
        select(getVehicleChecksCatD),
        map((vehicleChecks) => {
          return this.faultCountProvider.getVehicleChecksFaultCount(this.testCategory, vehicleChecks).seriousFaults;
        }),
      ),
    };
  }
}
