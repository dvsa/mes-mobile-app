import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

@Component({
  selector: 'debrief-witnessed',
  templateUrl: 'debrief-witnessed.html',
})
export class DebriefWitnessedComponent implements OnChanges {
  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  debriefWitnessed: boolean;

  @Input()
  formGroup: FormGroup;

  @Output()
  debriefWitnessedChange = new EventEmitter<boolean>();

  private formControl: FormControl;

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl('debriefWitnessed', this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, 'debriefWitnessed');

    if (visibilityType === 'N') {
      this.formGroup.get('debriefWitnessed').clearValidators();
    } else {
      this.formGroup.get('debriefWitnessed').setValidators([Validators.required]);
    }
    if (this.debriefWitnessed !== null) {
      this.formControl.patchValue(this.debriefWitnessed ? 'Yes' : 'No');
    } else {
      this.formControl.patchValue(null);
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
