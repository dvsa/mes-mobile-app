import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { StoreModel } from '../../../../../shared/models/store.model';

// TODO: MES-4287 Import cat c reducer
import { getTestData } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { map } from 'rxjs/operators';
import { getVehicleChecksCatBE }

// TODO: MES-4287 Import cat c selectors
from '../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.selector';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { Observable } from 'rxjs/Observable';

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

        // TODO: MES-4287 use cat C function
        select(getVehicleChecksCatBE),
        map((vehicleChecks) => {

          // TODO: MES-4287 use cat c function
          return this.faultCountProvider.getVehicleChecksFaultCountCatBE(vehicleChecks).drivingFaults;
        }),
      ),
      vehicleChecksSeriousFaultCount$: currentTest$.pipe(
        select(getTestData),

        // TODO: MES-4287 Use cat c function
        select(getVehicleChecksCatBE),
        map((vehicleChecks) => {

          // TODO: MES-4287 use cat c function
          return this.faultCountProvider.getVehicleChecksFaultCountCatBE(vehicleChecks).seriousFaults;
        }),
      ),
    };

  }

}
