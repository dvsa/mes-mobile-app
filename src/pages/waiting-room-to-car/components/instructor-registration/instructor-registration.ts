import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    this.formControl.patchValue(this.instructorRegistration);
  }

  instructorRegistrationChanged(instructorRegistration: string): void {
    if (this.isNumeric(instructorRegistration)) {
      this.instructorRegistrationChange.emit(Number.parseInt(instructorRegistration, 10));
    }
  }

  isNumeric(value: string): boolean {

    if (value === null || value === '') {
      return false;
    }
    const regExp = new RegExp('^([0-9]*)$');
    return regExp.test(value);
  }

}
