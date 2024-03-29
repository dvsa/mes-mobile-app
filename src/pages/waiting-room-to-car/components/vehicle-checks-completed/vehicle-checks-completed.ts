import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { StoreModel } from '../../../../shared/models/store.model';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { merge, Observable, Subscription } from 'rxjs';
import { getTestData } from '../../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import {
  getFullLicenceHeld,
  getVehicleChecksCatC, hasFullLicenceHeldBeenSelected,
} from '../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';
import { map, tap } from 'rxjs/operators';
import { vehicleChecksQuestionsByLicenceHeld } from '../../../../shared/helpers/vehicle-checks-questions-by-category';

enum VehicleChecksCompletedResult {
  COMPLETED = 'Completed',
  NOT_COMPLETED = 'Not completed',
}

interface ComponentState {
  fullLicenceHeld$: Observable<boolean>;
  fullLicenceHeldSelection$: Observable<string>;
  drivingFaultsNumberOptions$: Observable<number[]>;
}

@Component({
  selector: 'vehicle-checks-completed',
  templateUrl: 'vehicle-checks-completed.html',
})
export class VehicleChecksToggleComponent implements OnChanges, OnDestroy, OnInit {

  formControl: FormControl;
  componentState: ComponentState;
  drivingFaultNumberFormControl: FormControl;
  subscription: Subscription;
  merged$: Observable<boolean>;
  drivingFaultsNumberOptions: number[] = [];
  fullLicenceSelection: string;

  @Input()
  vehicleChecksCompleted: boolean;

  @Input()
  testCategory: TestCategory;

  @Input()
  formGroup: FormGroup;

  @Output()
  vehicleChecksCompletedOutcomeChange = new EventEmitter<boolean>();

  @Output()
  vehicleChecksDrivingFaultsNumberChange = new EventEmitter<number>();

  constructor(private store$: Store<StoreModel>) {}

  ngOnInit() {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.componentState = {
      fullLicenceHeld$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatC),
        select(getFullLicenceHeld),
      ),
      fullLicenceHeldSelection$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatC),
        select(getFullLicenceHeld),
        map(licenceHeld => hasFullLicenceHeldBeenSelected(licenceHeld)),
      ),
      drivingFaultsNumberOptions$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatC),
        select(getFullLicenceHeld),
        map(licenceHeld => Array(vehicleChecksQuestionsByLicenceHeld(licenceHeld) + 1).fill(null).map((v, i) => i)),
      ),
    };

    const { fullLicenceHeld$ } = this.componentState;

    const merged$ = merge(
      fullLicenceHeld$.pipe(
        tap(() => {
          // when fullLicenceHeld changes, then set the fault count dropdown back to a null in it's default state
          this.drivingFaultNumberFormControl.markAsPristine({ onlySelf: true });
          this.drivingFaultNumberFormControl.patchValue(null);
        }),
      ),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.formGroup.addControl('vehicleChecksToggleCtrl', this.formControl);
    }
    if (!this.drivingFaultNumberFormControl) {
      this.drivingFaultNumberFormControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl('vehicleChecksDrivingFaultsNumber', this.drivingFaultNumberFormControl);
    }
    this.formControl.patchValue(this.vehicleChecksCompleted);
  }

  vehicleChecksToggleResultChanged(result: string): void {
    if (this.formControl.valid) {
      this.vehicleChecksCompletedOutcomeChange.emit(result === VehicleChecksCompletedResult.COMPLETED);
    }
  }

  vehicleChecksDrivingFaultsNumberChanged(number: number) {
    this.vehicleChecksDrivingFaultsNumberChange.emit(number);
  }

  get invalidDropdown(): boolean {
    return !this.drivingFaultNumberFormControl.valid && this.drivingFaultNumberFormControl.dirty;
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
