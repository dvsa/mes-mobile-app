import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTestData } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { map } from 'rxjs/operators';
import { getVehicleChecksCatBE }
from '../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.selector';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { Observable } from 'rxjs';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

interface ComponentState {
  vehicleChecksDrivingFaultCount$: Observable<number>;
  vehicleChecksSeriousFaultCount$: Observable<number>;
}

@Component({
  selector: 'vehicle-checks',
  templateUrl: 'vehicle-checks.html',
})
export class VehicleChecksComponent implements OnInit {
  componentState: ComponentState;

  constructor(
    private store$: Store<StoreModel>,
    public faultCountProvider: FaultCountProvider) {}

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.componentState = {
      vehicleChecksDrivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatBE),
        map((vehicleChecks) => {
          return this.faultCountProvider.getVehicleChecksFaultCount(TestCategory.BE , vehicleChecks).drivingFaults;
        }),
      ),
      vehicleChecksSeriousFaultCount$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatBE),
        map((vehicleChecks) => {
          return this.faultCountProvider.getVehicleChecksFaultCount(TestCategory.BE, vehicleChecks).seriousFaults;
        }),
      ),
    };

  }

}
