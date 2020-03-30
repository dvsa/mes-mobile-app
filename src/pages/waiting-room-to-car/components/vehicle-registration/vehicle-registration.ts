import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isEmpty } from 'lodash';

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

  formControl: FormControl;

  private registrationNumberValidator: RegExp = /^[A-Z0-9]{1,7}$/gi;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl('vehicleRegistration', this.formControl);
    }
  }

  vehicleRegistrationChanged(event: any): void {
    if (!this.registrationNumberValidator.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^A-Z0-9]/gi, '');

      if (isEmpty(event.target.value)) {
        this.formControl.setErrors({ invalidValue: event.target.value });
      }
    }
    this.vehicleRegistrationChange.emit(event.target.value.toUpperCase());
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
