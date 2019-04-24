import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'debrief-witnessed',
  templateUrl: 'debrief-witnessed.html',
})
export class DebriefWitnessedComponent implements OnChanges {

  @Input()
  debriefWitnessed: boolean;

  @Input()
  formGroup: FormGroup;

  @Output()
  debriefWitnessedChange = new EventEmitter<boolean>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl('debriefWitnessed', this.formControl);
    }
    if (this.debriefWitnessed !== null) {
      this.formControl.patchValue(this.debriefWitnessed ? 'Yes' : 'No');
    }
  }

  debriefWitnessedChanged(debriefWitnessedFormValue: string): void {
    if (this.formControl.valid) {
      this.debriefWitnessedChange.emit(debriefWitnessedFormValue === 'Yes' ? true : false);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
