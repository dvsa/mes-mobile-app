import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'vehicle-registration',
  templateUrl: 'vehicle-registration.html',
})
export class VehicleRegistrationComponent implements OnChanges {

  @Input()
  vehicleRegistration: string;

  @Input()
  formGroup: FormGroup;

  @Output()
  vehicleRegistrationChange = new EventEmitter<string>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl('vehicleRegistration', this.formControl);
    }
    this.formControl.patchValue(this.vehicleRegistration);
  }

  vehicleRegistrationChanged(vehicleRegistration: string): void {
    if (this.formControl.valid) {
      this.vehicleRegistrationChange.emit(vehicleRegistration);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
