import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StringType } from '../../../../../shared/helpers/string-type';

@Component({
  selector: 'instructor-registration',
  templateUrl: 'instructor-registration.html',
})
export class InstructorRegistrationComponent implements OnChanges {

  @Input()
  instructorRegistration: number;

  @Input()
  formGroup: FormGroup;

  @Output()
  instructorRegistrationChange = new EventEmitter<number>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl('instructorRegistration', this.formControl);
    }
    this.formGroup.get('instructorRegistration')
      .setValidators([Validators.min(1), Validators.max(9999999), Validators.pattern(/^[0-9]*$/)]);
    this.formControl.patchValue(this.instructorRegistration);
  }

  instructorRegistrationChanged(instructorRegistration: string): void {
    if (StringType.isNumeric(instructorRegistration)) {
      this.instructorRegistrationChange.emit(Number.parseInt(instructorRegistration, 10));
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
