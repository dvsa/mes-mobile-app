import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  FieldValidators,
  getInstructorRegistrationNumberValidator,
  nonLeadingZero,
  nonNumericValues,
} from '../../../../../shared/constants/field-validators/field-validators';

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

  formControl: FormControl;

  readonly instructorRegistrationNumberValidator: FieldValidators = getInstructorRegistrationNumberValidator();

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl('instructorRegistration', this.formControl);
    }
    this.formControl.patchValue(this.instructorRegistration);
  }

  instructorRegistrationChanged(event: any): void {
    if (!this.instructorRegistrationNumberValidator.pattern.test(event.target.value)) {
      event.target.value = event.target.value
        .replace(nonLeadingZero, '')
        .replace(nonNumericValues, '');
    }
    this.instructorRegistrationChange.emit(Number(event.target.value) || null);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
