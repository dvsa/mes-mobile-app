import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'instructor-registration',
  templateUrl: 'instructor-registration.html',
})
export class InstructorRegistrationComponent implements OnChanges {

  @Input()
  instructorRegistration: string;

  @Input()
  formGroup: FormGroup;

  @Output()
  instructorRegistrationChange = new EventEmitter<string>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl('instructorRegistration', this.formControl);
    }
    this.formControl.patchValue(this.instructorRegistration);
  }

  instructorRegistrationChanged(instructorRegistration: string): void {
    if (this.formControl.valid) {
      this.instructorRegistrationChange.emit(instructorRegistration);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
