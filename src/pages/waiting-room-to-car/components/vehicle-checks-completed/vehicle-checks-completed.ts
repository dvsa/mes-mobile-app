import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  NUMBER_OF_SHOW_ME_QUESTIONS,
} from '../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import {
  NUMBER_OF_TELL_ME_QUESTIONS,
} from '../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';

enum VehicleChecksCompletedResult {
  COMPLETED = 'Completed',
  NOT_COMPLETED = 'Not completed',
}

@Component({
  selector: 'vehicle-checks-completed',
  templateUrl: 'vehicle-checks-completed.html',
})
export class VehicleChecksToggleComponent implements OnChanges {

  formControl: FormControl;

  @Input()
  vehicleChecksCompleted: boolean;

  @Input()
  formGroup: FormGroup;

  @Output()
  vehicleChecksCompletedOutcomeChange = new EventEmitter<boolean>();

  @Output()
  vehicleChecksDrivingFaultsNumberChange = new EventEmitter<number>();

  drivingFaultsNumberOptions: number[] = Array(
    NUMBER_OF_SHOW_ME_QUESTIONS +
    NUMBER_OF_TELL_ME_QUESTIONS + 1,
  ).fill(null).map((v, i) => i);

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.formGroup.addControl('vehicleChecksToggleCtrl', this.formControl);
      this.formGroup.addControl('vehicleChecksDrivingFaultsNumber', this.formControl);
      this.formGroup.addControl('vehicleChecksSeriousFaultsNumber', this.formControl);
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

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
