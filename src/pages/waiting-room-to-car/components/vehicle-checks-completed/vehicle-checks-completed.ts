import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.formGroup.addControl('vehicleChecksToggleCtrl', this.formControl);
    }
    this.formControl.patchValue(this.vehicleChecksCompleted);
  }
  vehicleChecksToggleResultChanged(result: string): void {
    if (this.formControl.valid) {
      this.vehicleChecksCompletedOutcomeChange.emit(result === VehicleChecksCompletedResult.COMPLETED);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
