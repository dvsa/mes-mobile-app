import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IndependentDriving } from '@dvsa/mes-test-schema/categories/B';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

@Component({
  selector: 'independent-driving',
  templateUrl: 'independent-driving.html',
})
export class IndependentDrivingComponent implements OnChanges {
  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  independentDriving: IndependentDriving;

  @Input()
  formGroup: FormGroup;

  @Output()
  independentDrivingChange = new EventEmitter<IndependentDriving>();

  private formControl: FormControl;

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl('independentDriving', this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, 'independentDriving');

    if (visibilityType === 'N') {
      this.formGroup.get('independentDriving').clearValidators();
    } else {
      this.formGroup.get('independentDriving').setValidators([Validators.required]);
    }

    this.formControl.patchValue(this.independentDriving);
  }

  independentDrivingChanged(independentDriving: IndependentDriving): void {
    if (this.formControl.valid) {
      this.independentDrivingChange.emit(independentDriving);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
